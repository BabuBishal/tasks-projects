import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateFeeStatus } from "@/lib/utils/status-utils";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const status = searchParams.get("status");
    const method = searchParams.get("method");

    const where: Prisma.PaymentWhereInput = {};

    if (query) {
      where.OR = [
        {
          studentFee: {
            student: {
              name: { contains: query, mode: "insensitive" },
            },
          },
        },
        {
          studentFee: {
            student: {
              rollNo: { contains: query, mode: "insensitive" },
            },
          },
        },
        { receiptNo: { contains: query, mode: "insensitive" } },
      ];
    }

    if (status && status !== "all") {
      where.studentFee = {
        status: { equals: status, mode: "insensitive" },
      };
    }

    if (method && method !== "all") {
      where.method = { equals: method, mode: "insensitive" };
    }

    const payments = await prisma.payment.findMany({
      where,
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
        date: "desc",
      },
    });

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
        program: student?.program?.name ?? "N/A",
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        receiptNo: payment.receiptNo,
        status: paymentStatus,
        feeBalance: fee.balance,
        feeStatus: fee.status,
        academicYear: fee.academicYear,
      };
    });

    return NextResponse.json(paymentHistory);
  } catch (error) {
    console.error("Error fetching payments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch payments from database",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
