import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { StudentWithFees } from '@/lib/types/prisma'
import {
  getAcademicYearForSemester,
  getSemesterStartDate,
  getDueDate,
  calculateJoinedYear,
  generateProgramPrefix,
} from '@/lib/utils/utils'

export async function GET(req: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const programId = searchParams.get('programId') || ''
    const semester = searchParams.get('semester') || ''
    const status = searchParams.get('status') || ''

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Build where clause
    const where: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        email?: { contains: string; mode: 'insensitive' }
        rollNo?: { contains: string; mode: 'insensitive' }
      }>
      programId?: string
      semester?: number
      status?: string
    } = {}

    // Search filter (name, email, or rollNo)
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { rollNo: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Program filter
    if (programId && programId !== 'all') {
      where.programId = programId
    }

    // Semester filter
    if (semester && semester !== 'all') {
      where.semester = parseInt(semester)
    }

    // Status filter (student status, not fee status)
    if (status && status !== 'All') {
      where.status = status
    }

    // Get total count for pagination
    const total = await prisma.student.count({ where })

    const students = (await prisma.student.findMany({
      where,
      include: {
        program: true,
        fees: {
          include: {
            payments: true,
            feeStructure: {
              include: {
                programSemester: true,
              },
            },
          },
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })) as unknown as StudentWithFees[]

    return NextResponse.json({
      data: students,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to fetch students from database',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

import { createStudentSchema } from '@/app/[locale]/(root)/students/_types/schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body using Zod
    const validationResult = createStudentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const {
      name,
      email,
      programId,
      semester,
      phone,
      address,
      scholarshipId,
      rollNo: inputRollNo,
      year: inputYear,
      joinedYear: inputJoinedYear,
    } = validationResult.data

    // Check email uniqueness
    const existingEmail = await prisma.student.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    // Verify program exists
    const program = await prisma.program.findUnique({
      where: { id: programId },
    })

    if (!program) {
      return NextResponse.json({ error: 'Invalid program ID' }, { status: 400 })
    }

    // ---------------------------------------------------------
    // 1️⃣ Auto-generate roll number if not provided or empty
    // ---------------------------------------------------------

    // Always calculate these to ensure consistency
    const joinedYear = calculateJoinedYear(semester)
    const studentSemester = Number(semester) || 1

    // Use input year if provided and valid, otherwise use calculated
    const finalYear = inputYear || joinedYear
    const finalJoinedYear = inputJoinedYear || joinedYear

    let finalRollNo = inputRollNo

    if (!finalRollNo) {
      const prefix = generateProgramPrefix(program.name)

      // Count existing students in same program + year
      const studentCount = await prisma.student.count({
        where: { programId: programId, year: finalJoinedYear },
      })

      finalRollNo = `${prefix}-${finalJoinedYear}-${String(studentCount + 1).padStart(4, '0')}`
    }

    // ---------------------------------------------------------
    // 2️⃣ Fetch scholarship once (if provided)
    // ---------------------------------------------------------
    let scholarship = null
    if (scholarshipId) {
      scholarship = await prisma.scholarship.findUnique({
        where: { id: scholarshipId },
      })
    }

    // ---------------------------------------------------------
    // 3️⃣ Create StudentFee record ONLY for current semester
    // IMPROVED: No retroactive fees for past semesters
    // ---------------------------------------------------------
    const studentFeesToCreate = []

    // Only create fee for the current semester
    const sem = studentSemester

    // Calculate academic year for this semester
    const academicYear = getAcademicYearForSemester(joinedYear, sem)
    const startDate = getSemesterStartDate(joinedYear, sem)
    const dueDate = getDueDate(startDate)

    // Find the fee structure for this program and semester
    const feeStructure = await prisma.feeStructure.findFirst({
      where: {
        programSemester: {
          programId: programId,
          semesterNo: sem,
        },
      },
    })

    if (!feeStructure) {
      return NextResponse.json(
        {
          error: `No fee structure found for ${program.name} Semester ${sem}. Please configure fee structure first.`,
        },
        { status: 400 }
      )
    }

    // Calculate discount for this semester
    let discount = 0
    if (scholarship) {
      if (scholarship.type === 'percentage') {
        discount = Math.floor((feeStructure.totalFee * scholarship.value) / 100)
      } else if (scholarship.type === 'fixed') {
        discount = scholarship.value
      }
    }

    const payableFee = Math.max(0, feeStructure.totalFee - discount)

    // Determine initial status based on due date
    const now = new Date()
    const initialStatus = dueDate < now ? 'Overdue' : 'Pending'

    studentFeesToCreate.push({
      feeStructureId: feeStructure.id,
      academicYear: academicYear,
      originalFee: feeStructure.totalFee,
      discount: discount,
      payableFee: payableFee,
      balance: payableFee,
      status: initialStatus,
      dueDate: dueDate,
    })

    console.log(
      `Creating student in Semester ${studentSemester} with ${studentFeesToCreate.length} fee records`
    )

    // Validation: Ensure at least one fee was created
    if (studentFeesToCreate.length === 0) {
      return NextResponse.json(
        {
          error: `No fee structures found for ${program.name}. Please configure fee structures first.`,
        },
        { status: 400 }
      )
    }

    // ---------------------------------------------------------
    // 4️⃣ Create student with all fee records and scholarships
    // ---------------------------------------------------------
    const studentData: {
      name: string
      email: string
      rollNo: string
      programId: string
      semester: number
      phone: string
      address: string
      year: number
      joinedYear: number
      fees: { create: typeof studentFeesToCreate }
      scholarships?: { create: { scholarshipId: string } }
    } = {
      name,
      email,
      rollNo: finalRollNo,
      programId,
      semester: studentSemester,
      phone: phone || '',
      address: address || '',
      year: finalYear,
      joinedYear: finalJoinedYear,
      fees: {
        create: studentFeesToCreate,
      },
    }

    // Add scholarship if provided
    if (scholarshipId && scholarshipId.trim() !== '') {
      studentData.scholarships = {
        create: {
          scholarshipId: scholarshipId,
        },
      }
    }

    const newStudent = await prisma.student.create({
      data: studentData,
      include: {
        program: true,
        fees: {
          include: {
            feeStructure: {
              include: {
                programSemester: true,
              },
            },
            payments: true,
          },
          orderBy: [{ academicYear: 'asc' }, { createdAt: 'asc' }],
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
    })

    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: 'Failed to create student', details: errorMessage },
      { status: 500 }
    )
  }
}
