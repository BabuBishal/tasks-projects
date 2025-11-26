import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PaymentStatsResponse } from "@/lib/types/api";

export async function GET() {
  try {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Today's collections
    const todaysPayments = await prisma.payment.findMany({
      where: {
        date: {
          gte: startOfToday,
        },
      },
    });

    const todaysCollections = todaysPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    // This month's collections
    const monthPayments = await prisma.payment.findMany({
      where: {
        date: {
          gte: startOfMonth,
        },
      },
    });

    const monthCollections = monthPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    // Pending amount (total balance from all student fees)
    const allFees = await prisma.studentFee.findMany();
    const pendingAmount = allFees.reduce((sum, fee) => sum + fee.balance, 0);

    // Payment success rate (payments made before or on due date)
    const allPayments = await prisma.payment.findMany({
      include: {
        studentFee: {
          select: {
            dueDate: true,
          },
        },
      },
    });

    const totalPayments = allPayments.length;
    const onTimePayments = allPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const dueDate = new Date(payment.studentFee.dueDate);
      return paymentDate <= dueDate;
    }).length;

    const paymentSuccessRate =
      totalPayments > 0
        ? Math.round((onTimePayments / totalPayments) * 100)
        : 0;

    // Payment method distribution
    const paymentsByMethod = await prisma.payment.groupBy({
      by: ["method"],
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    const methodDistribution = paymentsByMethod.map((item) => ({
      method: item.method,
      amount: item._sum.amount || 0,
      count: item._count.id,
    }));

    // Monthly collection trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await prisma.payment.groupBy({
      by: ["date"],
      where: {
        date: {
          gte: sixMonthsAgo,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Group by month
    const trendsByMonth = monthlyTrends.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += item._sum.amount || 0;
      return acc;
    }, {} as Record<string, number>);

    const monthlyCollectionTrends = Object.entries(trendsByMonth).map(
      ([month, amount]) => ({
        month,
        amount,
      })
    );

    return NextResponse.json<PaymentStatsResponse>({
      todaysCollections,
      monthCollections,
      pendingAmount,
      paymentSuccessRate,
      methodDistribution,
      monthlyCollectionTrends,
    });
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment statistics" },
      { status: 500 }
    );
  }
}
