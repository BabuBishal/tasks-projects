"use client";

import PaymentStatusOverview from "../_components/PaymentStatusOverview";
import QuickActions from "../_components/QuickActions";
import QuickStats from "../_components/QuickStats";
import AlertsNotifications from "../_components/AlertsNotifications";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import StatsCard from "@/components/ui/stats-card/StatsCard";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/hooks/query-hooks/dashboard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();
  console.log("🚀 ~ DashboardPage ~ data:", data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div>Loading Data ...</div>
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const {
    dashboardStats = [],
    paymentStats = { paid: 0, partial: 0, overdue: 0, pending: 0, total: 0 },
    overdueFees = [],
  } = data || {};

  // Calculate quick stats from existing data
  const collectionStatusStat = dashboardStats.find(
    (s) => s.title === "Collection Status"
  );

  const collectionRate = (() => {
    if (!collectionStatusStat) return 0;

    const { value } = collectionStatusStat;

    return typeof value === "number" ? value : parseInt(value);
  })();

  const studentsPending = paymentStats.pending + paymentStats.overdue;
  const upcomingDeadlines = overdueFees.filter(
    (fee) => fee.daysOverdue < 7 && fee.daysOverdue >= 0
  ).length;

  // Generate alerts from overdue fees
  const alerts = overdueFees
    .filter((fee) => fee.daysOverdue > 30 || fee.paidAmount === 0)
    .slice(0, 10)
    .map((fee) => ({
      id: fee.id,
      type:
        fee.daysOverdue > 30
          ? ("critical_overdue" as const)
          : ("zero_payment" as const),
      studentId: fee.studentId,
      studentName: fee.studentName,
      message:
        fee.daysOverdue > 30
          ? `Critical: ${fee.daysOverdue} days overdue`
          : "No payment received yet",
      amount: fee.balance,
      daysOverdue: fee.daysOverdue,
    }));

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Fee Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={dashboardStats[1]?.value || "0"}
          icon={Users}
          description={dashboardStats[1]?.desc || "Total students enrolled"}
          variant="primary"
        />
        <StatsCard
          title="Total Revenue"
          value={dashboardStats[0]?.value || "Rs 0"}
          icon={DollarSign}
          description={dashboardStats[0]?.desc || "Total fees collected"}
          variant="success"
        />
        <StatsCard
          title="Pending Collections"
          value={dashboardStats[2]?.value || "Rs 0"}
          icon={Clock}
          description={dashboardStats[2]?.desc || "Awaiting payments"}
          variant="warning"
        />
        <StatsCard
          title="Collection Rate"
          value={dashboardStats[3]?.value || "0%"}
          icon={TrendingUp}
          description={dashboardStats[3]?.desc || "Payment success rate"}
          variant="primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 gap-6">
          <PaymentStatusOverview paymentStats={paymentStats} />
        </div>
        <div className="col-span-1 gap-6">
          <QuickActions />
        </div>

        <div className="col-span-2">
          <QuickStats
            collectionRate={collectionRate}
            studentsPending={studentsPending}
            upcomingDeadlines={upcomingDeadlines}
            programDistribution={[]}
          />
        </div>

        <div className="col-span-2">
          <AlertsNotifications alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
