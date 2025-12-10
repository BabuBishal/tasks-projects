import { StudentFeeWithDetails } from '@/lib/types'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculatePaymentPercentage,
  calculateSemestersBehind,
  calculateUrgencyLevel,
  sortByUrgency,
} from '@/lib/utils/urgency-utils'

export async function GET() {
  try {
    const overdueFees = (await prisma.studentFee.findMany({
      where: {
        status: {
          in: ['Overdue', 'Partial'],
        },
        dueDate: {
          lt: new Date(),
        },
      },
      include: {
        student: {
          include: {
            program: true,
          },
        },
        feeStructure: {
          include: {
            programSemester: true,
          },
        },
        payments: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
      take: 50, // Increased from 10 to show more overdue fees
    })) as unknown as StudentFeeWithDetails[]

    const newOverdueFees = sortByUrgency(
      overdueFees.map((fee: StudentFeeWithDetails) => {
        const daysOverdue = Math.floor(
          (new Date().getTime() - new Date(fee.dueDate).getTime()) / (1000 * 60 * 60 * 24)
        )
        const paymentPercentage = calculatePaymentPercentage(fee.paid, fee.payableFee)
        const semestersBehind = calculateSemestersBehind(
          fee.student.semester,
          fee.feeStructure.programSemester?.semesterNo || 1
        )

        return {
          id: fee.id,
          studentId: fee.student.id,
          studentName: fee.student.name,
          studentRollNo: fee.student.rollNo,
          program: fee.student.program.name,

          // Fee details
          academicYear: fee.academicYear,
          semester: fee.feeStructure.programSemester?.semesterNo || 1,
          totalFee: fee.payableFee,
          paidAmount: fee.paid,
          balance: fee.balance,
          paymentPercentage,

          // Urgency metrics
          dueDate: fee.dueDate,
          daysOverdue,
          urgencyLevel: calculateUrgencyLevel(daysOverdue),

          // Context
          currentSemester: fee.student.semester,
          semestersBehind,
          status: fee.status,
        }
      })
    )
    return NextResponse.json(newOverdueFees)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch overdue fees' }, { status: 500 })
  }
}
