import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { StudentFull } from '@/lib/types/prisma'
import { updateStudentSchema } from '@/app/[locale]/(root)/students/_types/schema'
import { syncFeesForSemesterChange } from '@/app/[locale]/(root)/_services/SyncFeesForSemesterChange'

// GET single student by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Missing student ID in request URL' }, { status: 400 })
  }

  try {
    const student = (await prisma.student.findUnique({
      where: { id },
      include: {
        program: true,
        fees: {
          include: {
            payments: true,
            feeStructure: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
    })) as unknown as StudentFull | null

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Calculate total original fee first (needed for percentage scholarships)
    const totalOriginalFee = student.fees.reduce((total, fee) => total + fee.originalFee, 0)

    // Calculate total scholarship amount based on type
    const totalScholarshipAmount = student.scholarships.reduce((total, ss) => {
      const scholarship = ss.scholarship

      if (scholarship.type === 'fixed') {
        // Fixed amount (e.g., Sports Scholarship)
        return total + scholarship.value
      } else if (scholarship.type === 'percentage') {
        // Percentage-based (e.g., Merit 25%, Need-based 50%)
        // Calculate percentage of total original fee
        const scholarshipAmount = (totalOriginalFee * scholarship.value) / 100
        return total + scholarshipAmount
      }

      return total
    }, 0)

    // Calculate total payable fee (sum of all fee payableFee)
    const totalPayableFee = student.fees.reduce((total, fee) => total + fee.payableFee, 0)

    // Calculate total paid (sum of all fee paid)
    const totalPaid = student.fees.reduce((total, fee) => total + fee.paid, 0)

    // Calculate total balance/remaining (sum of all fee balance)
    const totalBalance = student.fees.reduce((total, fee) => total + fee.balance, 0)

    // Calculate total discount applied
    const totalDiscount = student.fees.reduce((total, fee) => total + fee.discount, 0)

    // Calculate scholarships with actual amounts for display
    const scholarshipsWithAmounts = student.scholarships.map(ss => {
      const scholarship = ss.scholarship
      let actualAmount = 0

      if (scholarship.type === 'fixed') {
        actualAmount = scholarship.value
      } else if (scholarship.type === 'percentage') {
        actualAmount = (totalOriginalFee * scholarship.value) / 100
      }

      return {
        ...ss,
        actualAmount, // Add calculated amount
      }
    })

    // Attach calculated totals to the student object
    const studentWithTotals = {
      ...student,
      scholarships: scholarshipsWithAmounts, // Replace with scholarships that have actualAmount
      totalScholarshipAmount,
      totalOriginalFee,
      totalPayableFee,
      totalPaid,
      totalBalance,
      totalDiscount,
    }

    return NextResponse.json(studentWithTotals)
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 })
  }
}

// UPDATE student
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // CRITICAL CHECK: Ensure the ID is present
  if (!id) {
    return NextResponse.json({ error: 'Missing student ID in request URL' }, { status: 400 })
  }

  try {
    const body = await req.json()

    // Validate request body using Zod
    const validationResult = updateStudentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
    })

    if (!existingStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check for duplicate email (if changing)
    if (validatedData.email && validatedData.email !== existingStudent.email) {
      const emailExists = await prisma.student.findUnique({
        where: { email: validatedData.email },
      })

      if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
      }
    }

    // Check for duplicate roll number (if changing)
    if (validatedData.rollNo && validatedData.rollNo !== existingStudent.rollNo) {
      const rollNoExists = await prisma.student.findUnique({
        where: { rollNo: validatedData.rollNo },
      })

      if (rollNoExists) {
        return NextResponse.json({ error: 'Roll number already exists' }, { status: 400 })
      }
    }

    // Verify program exists (if changing)
    if (validatedData.programId) {
      const program = await prisma.program.findUnique({
        where: { id: validatedData.programId },
      })

      if (!program) {
        return NextResponse.json({ error: 'Invalid program ID' }, { status: 400 })
      }
    }

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.email && { email: validatedData.email }),
        ...(validatedData.rollNo && { rollNo: validatedData.rollNo }),
        ...(validatedData.programId && { programId: validatedData.programId }),
        ...(validatedData.semester !== undefined && { semester: validatedData.semester }),
        ...(validatedData.phone !== undefined && { phone: validatedData.phone }),
        ...(validatedData.address !== undefined && { address: validatedData.address }),
        ...(validatedData.year !== undefined && { year: validatedData.year }),
        ...(validatedData.status && { status: validatedData.status }),
      },
      include: {
        program: true,
      },
    })

    // Handle fee sync when semester changes
    let feeSyncResult = null
    if (
      validatedData.semester !== undefined &&
      validatedData.semester !== existingStudent.semester
    ) {
      feeSyncResult = await syncFeesForSemesterChange(
        id,
        existingStudent.semester,
        validatedData.semester
      )

      if (!feeSyncResult.success) {
        // Rollback student update if fee sync fails
        await prisma.student.update({
          where: { id },
          data: { semester: existingStudent.semester },
        })
        return NextResponse.json(
          { error: feeSyncResult.error || 'Failed to sync fees for semester change' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({
      ...updatedStudent,
      feeSync: feeSyncResult,
    })
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json({ error: error || 'Failed to update student' }, { status: 500 })
  }
}

// DELETE student
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // CRITICAL CHECK: Ensure the ID is present
  if (!id) {
    return NextResponse.json({ error: 'Missing student ID in request URL' }, { status: 400 })
  }

  try {
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        fees: true,
      },
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Check if student has any fees/payments
    if (student.fees[0].balance > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete student with existing fees. Please clear all fees first.',
        },
        { status: 400 }
      )
    }

    // Delete student (scholarships will be cascade deleted)
    await prisma.student.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 })
  }
}
