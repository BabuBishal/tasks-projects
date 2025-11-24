// app/api/dashboard-stats/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type {
  StudentWithFees,
  PaymentWithStudent,
  StudentFeeWithDetails,
} from "@/lib/@types/prisma";
import type {
  DashboardData,
  DashboardStats,
  PaymentStats,
} from "@/lib/@types/api";
import { calculateStudentStatus } from "@/lib/status-utils";

type StudentPaymentStatus = {
  studentId: string;
  status: "paid" | "partial" | "overdue" | "pending" | "no-fees";
};

export async function GET() {
  try {
    // Fetch all students with their fees
    const students = (await prisma.student.findMany({
      include: {
        fees: {
          include: {
            payments: true,
            feeStructure: true,
          },
        },
        program: true,
      },
    })) as unknown as StudentWithFees[];

    // Calculate totals from all student fees
    const allFees = students.flatMap((student) => student.fees);

    const totalStudents = students.length;

    // Total fee = sum of all payable fees
    const totalFee = allFees.reduce((sum, fee) => sum + fee.payableFee, 0);

    // Total revenue = sum of all paid amounts
    const totalRevenue = allFees.reduce((sum, fee) => sum + fee.paid, 0);

    // Pending payment = sum of all balances
    const pendingPayment = allFees.reduce((sum, fee) => sum + fee.balance, 0);

    // Payment success percentage
    const paymentStatusPercentage =
      totalFee > 0 ? Math.floor((totalRevenue / totalFee) * 100) : 0;

    // Student payment status categorization using centralized function
    const studentPaymentStatus: StudentPaymentStatus[] = students.map(
      (student) => {
        const status = calculateStudentStatus(student.fees);

        // Convert to lowercase for internal counting
        const normalizedStatus =
          status === "No Fees"
            ? "no-fees"
            : (status.toLowerCase() as
                | "paid"
                | "partial"
                | "overdue"
                | "pending");

        return {
          studentId: student.id,
          status: normalizedStatus,
        };
      }
    );

    // Count students by status
    const paidStudents = studentPaymentStatus.filter(
      (s) => s.status === "paid"
    ).length;

    const partialStudents = studentPaymentStatus.filter(
      (s) => s.status === "partial"
    ).length;

    const overdueStudents = studentPaymentStatus.filter(
      (s) => s.status === "overdue"
    ).length;

    const pendingStudents = studentPaymentStatus.filter(
      (s) => s.status === "pending"
    ).length;

    // Dashboard stats cards
    const dashboardStats: DashboardStats[] = [
      {
        title: "Total Revenue",
        value: `Rs ${totalRevenue.toLocaleString()}`,
        desc: "Total fees collected",
        icon: "💰",
      },
      {
        title: "Total Students",
        value: totalStudents.toString(),
        desc: "Total students enrolled",
        icon: "👨‍🎓",
      },
      {
        title: "Pending Payments",
        value: `Rs ${pendingPayment.toLocaleString()}`,
        desc: "Awaiting Payments",
        icon: "⏳",
      },
      {
        title: "Collection Status",
        value: `${paymentStatusPercentage}%`,
        desc: "Total Payment Success",
        icon: "📊",
      },
    ];

    // Payment statistics
    const paymentStats: PaymentStats = {
      paid: paidStudents,
      partial: partialStudents,
      overdue: overdueStudents,
      pending: pendingStudents,
      total: totalStudents,
    };

    // Recent payments (last 5)
    const recentPayments = await prisma.payment.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
      include: {
        studentFee: {
          include: {
            student: true,
          },
        },
      },
    });

    // Overdue fees
    const overdueFees = await prisma.studentFee.findMany({
      where: {
        balance: {
          gt: 0,
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
        feeStructure: true,
        payments: true,
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 10,
    });

    return NextResponse.json<DashboardData>({
      dashboardStats,
      paymentStats,
      recentPayments: recentPayments.map((payment: PaymentWithStudent) => ({
        id: payment.id,
        studentId: payment.studentFee.student.id,
        studentName: payment.studentFee.student.name,
        amount: payment.amount,
        method: payment.method,
        date: payment.date,
        receiptNo: payment.receiptNo,
      })),
      overdueFees: overdueFees.map((fee: StudentFeeWithDetails) => ({
        id: fee.id,
        studentId: fee.student.id,
        studentName: fee.student.name,
        studentRollNo: fee.student.rollNo,
        program: fee.student.program.name,
        balance: fee.balance,
        dueDate: fee.dueDate,
        daysOverdue: Math.floor(
          (new Date().getTime() - new Date(fee.dueDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Error fetching dashboard data" },
      { status: 500 }
    );
  }
}
