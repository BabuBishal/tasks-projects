import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const whereClause: any = {};

    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Get payments with studentFee, student, and program information
    const payments = await prisma.payment.findMany({
      where: whereClause,
      include: {
        studentFee: {
          include: {
            student: {
              include: {
                program: true,
              },
            },
            feeStructure: {
              include: {
                programSemester: {
                  include: {
                    program: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Get program statistics
    const programStats = new Map<
      string,
      {
        program: string;
        totalPayments: number;
        totalAmount: number;
        paidCount: number;
        partialCount: number;
        pendingCount: number;
        overdueCount: number;
      }
    >();

    // Process payments to group by program
    for (const payment of payments) {
      const programName = payment.studentFee.student.program.name;

      if (!programStats.has(programName)) {
        programStats.set(programName, {
          program: programName,
          totalPayments: 0,
          totalAmount: 0,
          paidCount: 0,
          partialCount: 0,
          pendingCount: 0,
          overdueCount: 0,
        });
      }

      const stats = programStats.get(programName)!;
      stats.totalPayments += 1;
      stats.totalAmount += payment.amount;

      // Count by status from studentFee
      const status = payment.studentFee.status;
      if (status === "Paid") stats.paidCount += 1;
      else if (status === "Partial") stats.partialCount += 1;
      else if (status === "Pending") stats.pendingCount += 1;
      else if (status === "Overdue") stats.overdueCount += 1;
    }

    // Group by Semester
    const semesterStats = new Map<
      number,
      { semester: number; totalPayments: number; totalAmount: number }
    >();

    for (const payment of payments) {
      const semester = payment.studentFee.student.semester;

      if (!semesterStats.has(semester)) {
        semesterStats.set(semester, {
          semester,
          totalPayments: 0,
          totalAmount: 0,
        });
      }

      const stats = semesterStats.get(semester)!;
      stats.totalPayments += 1;
      stats.totalAmount += payment.amount;
    }

    // Group by Method
    const methodStats = new Map<
      string,
      { method: string; count: number; amount: number }
    >();

    for (const payment of payments) {
      const method = payment.method;

      if (!methodStats.has(method)) {
        methodStats.set(method, { method, count: 0, amount: 0 });
      }

      const stats = methodStats.get(method)!;
      stats.count += 1;
      stats.amount += payment.amount;
    }

    return NextResponse.json({
      byProgram: Array.from(programStats.values()),
      bySemester: Array.from(semesterStats.values()).sort(
        (a, b) => a.semester - b.semester
      ),
      byMethod: Array.from(methodStats.values()),
    });
  } catch (error) {
    console.error("Payment stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment statistics" },
      { status: 500 }
    );
  }
}
