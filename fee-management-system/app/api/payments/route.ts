import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateFeeStatus } from '@/lib/utils/status-utils'

export async function GET(req: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const method = searchParams.get('method') || ''

    const payments = await prisma.payment.findMany({
      where: {
        AND: [
          // Search filter (student name or receipt number)
          search
            ? {
                OR: [
                  {
                    studentFee: {
                      student: {
                        name: { contains: search, mode: 'insensitive' },
                      },
                    },
                  },
                  {
                    receiptNo: { contains: search, mode: 'insensitive' },
                  },
                ],
              }
            : {},
          // Method filter
          method ? { method: { equals: method, mode: 'insensitive' } } : {},
        ],
      },
      include: {
        studentFee: {
          include: {
            student: {
              include: {
                program: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc', // Most recent payments first
      },
    })

    // console.log("payments fetched successfully", payments.length);

    type PaymentWithStudent = (typeof payments)[number]

    const paymentHistory = payments.map((payment: PaymentWithStudent) => {
      const student = payment.studentFee.student
      const fee = payment.studentFee

      // Use centralized status calculation
      const paymentStatus = calculateFeeStatus({
        balance: fee.balance,
        paid: fee.paid,
        payableFee: fee.payableFee,
        dueDate: fee.dueDate,
      })

      return {
        id: payment.id,
        studentId: student.id,
        studentName: student?.name ?? 'Unknown',
        program: student?.program?.name ?? 'N/A',
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        receiptNo: payment.receiptNo,
        status: paymentStatus,
        feeBalance: fee.balance,
        feeStatus: fee.status,
        academicYear: fee.academicYear,
      }
    })

    // Filter by status (client-side since it's calculated)
    const filteredPayments = status
      ? paymentHistory.filter(p => p.status.toLowerCase() === status.toLowerCase())
      : paymentHistory

    // Calculate stats
    const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const totalPayments = filteredPayments.length

    // Calculate today's payments
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayPayments = filteredPayments
      .filter(p => {
        const paymentDate = new Date(p.date)
        paymentDate.setHours(0, 0, 0, 0)
        return paymentDate.getTime() === today.getTime()
      })
      .reduce((sum, p) => sum + p.amount, 0)

    return NextResponse.json({
      payments: filteredPayments,
      totalAmount,
      totalPayments,
      todayPayments,
    })
  } catch (error) {
    console.error('Error fetching payment history:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to fetch payment history from database',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
