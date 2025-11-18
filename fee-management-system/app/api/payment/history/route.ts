import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    });
    console.log("payments fetched successfully", payments);

    type PaymentWithStudent = (typeof payments)[number];

    const paymentHistory = payments.map((payment: PaymentWithStudent) => {
      const student = payment.studentFee.student;
      let paymentStatus = "Partial";

      return {
        id: payment.id,
        studentId: student.id,
        studentName: student?.name ?? "Unknown",
        rollNo: student?.rollNo ?? "N/A",
        program: student?.program?.name ?? "N/A",
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        status: paymentStatus,
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
