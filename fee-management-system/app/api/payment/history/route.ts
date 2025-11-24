import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateFeeStatus } from "@/lib/status-utils";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
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
        date: "desc", // Most recent payments first
      },
    });

    console.log("payments fetched successfully", payments);

    type PaymentWithStudent = (typeof payments)[number];

    const paymentHistory = payments.map((payment: PaymentWithStudent) => {
      const student = payment.studentFee.student;
      const fee = payment.studentFee;

      // Use centralized status calculation
      const paymentStatus = calculateFeeStatus({
        balance: fee.balance,
        paid: fee.paid,
        payableFee: fee.payableFee,
        dueDate: fee.dueDate,
      });

      return {
        id: payment.id,
        studentId: student.id,
        studentName: student?.name ?? "Unknown",
        rollNo: student?.rollNo ?? "N/A",
        program: student?.program?.name ?? "N/A",
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        receiptNo: payment.receiptNo,
        status: paymentStatus,
        // Additional useful info
        feeBalance: fee.balance,
        feeStatus: fee.status,
        academicYear: fee.academicYear,
      };
    });

    return NextResponse.json(paymentHistory);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}
