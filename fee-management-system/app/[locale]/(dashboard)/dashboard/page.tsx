"use client";
import PaymentHistory from "@/app/[locale]/(dashboard)/_components/PaymentHistory";
import { StatusBar } from "@/components/shared/status-bar/StatusBar";
import { DashboardData } from "@/lib/@types/prisma";
import { useState, useEffect } from "react";
import Overdue from "../_components/Overdue";
import PaymentStatusOverview from "../_components/PaymentStatusOverview";
import StatsOverview from "../_components/StatsOverview";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard-stats");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div>Loading Data ...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const { dashboardStats, paymentStats, recentPayments, overdueFees } = data;
  console.log("ds", dashboardStats);

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-secondary mt-1">
            Welcome to Fee Management System
          </p>
        </div>

        {/* Stats Cards */}
        <StatsOverview dashboardStats={dashboardStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Payment Status Chart */}
          <PaymentStatusOverview paymentStats={paymentStats} />

          {/* Recent Payments */}
          <PaymentHistory paymentData={recentPayments} />
        </div>

        {/* Overdue Fees */}
        <Overdue overdueFees={overdueFees} />
      </div>
    </div>
  );
}
