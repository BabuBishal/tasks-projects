import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseCSV } from '@/lib/utils/csv-parser'
import {
  getAcademicYearForSemester,
  getSemesterStartDate,
  getDueDate,
  calculateJoinedYear,
  generateProgramPrefix,
} from '@/lib/utils/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { csvContent } = body

    if (!csvContent) {
      return NextResponse.json({ error: 'CSV content is required' }, { status: 400 })
    }

    // Parse and validate CSV
    const parseResult = parseCSV(csvContent)

    if (!parseResult.valid) {
      return NextResponse.json(
        {
          error: 'CSV validation failed',
          errors: parseResult.errors,
        },
        { status: 400 }
      )
    }

    // Fetch all programs and scholarships for mapping
    const programs = await prisma.program.findMany()
    const scholarships = await prisma.scholarship.findMany()

    const results = {
      success: [] as unknown[],
      failed: [] as unknown[],
      total: parseResult.data.length,
    }

    // Process each row
    for (let i = 0; i < parseResult.data.length; i++) {
      const row = parseResult.data[i]
      const rowNumber = i + 2 // +2 for header and 0-index

      try {
        // Find program by name
        const program = programs.find(p => p.name.toLowerCase() === row.program.toLowerCase())

        if (!program) {
          results.failed.push({
            row: rowNumber,
            data: row,
            error: `Program "${row.program}" not found`,
          })
          continue
        }

        // Check if email already exists
        const existingStudent = await prisma.student.findUnique({
          where: { email: row.email },
        })

        if (existingStudent) {
          results.failed.push({
            row: rowNumber,
            data: row,
            error: `Email "${row.email}" already exists`,
          })
          continue
        }

        // Find scholarship if provided
        let scholarship = null
        if (row.scholarship) {
          scholarship = scholarships.find(
            s => s.name.toLowerCase() === row.scholarship?.toLowerCase()
          )
        }

        // Generate roll number
        const semester = Number(row.semester)
        const prefix = generateProgramPrefix(program.name)
        const joinedYear = calculateJoinedYear(semester)

        const studentCount = await prisma.student.count({
          where: { programId: program.id, year: joinedYear },
        })

        const rollNo = `${prefix}-${joinedYear}-${String(studentCount + 1).padStart(4, '0')}`

        // Calculate fee for current semester
        const academicYear = getAcademicYearForSemester(joinedYear, semester)
        const startDate = getSemesterStartDate(joinedYear, semester)
        const dueDate = getDueDate(startDate)

        const feeStructure = await prisma.feeStructure.findFirst({
          where: {
            programSemester: {
              programId: program.id,
              semesterNo: semester,
            },
          },
        })

        if (!feeStructure) {
          results.failed.push({
            row: rowNumber,
            data: row,
            error: `No fee structure found for ${program.name} Semester ${semester}`,
          })
          continue
        }

        // Calculate discount
        let discount = 0
        if (scholarship) {
          if (scholarship.type === 'percentage') {
            discount = Math.floor((feeStructure.totalFee * scholarship.value) / 100)
          } else if (scholarship.type === 'fixed') {
            discount = scholarship.value
          }
        }

        const payableFee = Math.max(0, feeStructure.totalFee - discount)
        const now = new Date()
        const initialStatus = dueDate < now ? 'Overdue' : 'Pending'

        // Create student with fee
        const studentData: any = {
          name: row.name,
          email: row.email,
          rollNo,
          programId: program.id,
          semester,
          phone: row.phone || '',
          address: row.address || '',
          year: joinedYear,
          joinedYear,
          fees: {
            create: [
              {
                feeStructureId: feeStructure.id,
                academicYear,
                originalFee: feeStructure.totalFee,
                discount,
                payableFee,
                balance: payableFee,
                status: initialStatus,
                dueDate,
              },
            ],
          },
        }

        // Add scholarship if exists
        if (scholarship) {
          studentData.scholarships = {
            create: [{ scholarshipId: scholarship.id }],
          }
        }

        const student = await prisma.student.create({
          data: studentData,
          include: {
            program: true,
            fees: true,
          },
        })

        results.success.push({
          row: rowNumber,
          student: {
            name: student.name,
            email: student.email,
            rollNo: student.rollNo,
            program: student.program.name,
            semester: student.semester,
          },
        })
      } catch (error: unknown) {
        results.failed.push({
          row: rowNumber,
          data: row,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      message: 'Bulk import completed',
      results,
    })
  } catch (error: unknown) {
    console.error('Bulk import error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to import students',
      },
      { status: 500 }
    )
  }
}
