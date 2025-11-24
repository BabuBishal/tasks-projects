"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import StatsCard from "@/components/ui/stats-card/StatsCard";
import { CreditCard, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import PaymentList from "@/components/payments/PaymentList";
import { useQuery } from "@tanstack/react-query";

interface PaymentWithDetails {
  id: string;
  studentName: string;
  program: string;
  amount: number;
  date: string;
  method: string;
  status: string;
  receiptNo: string;
}

interface PaymentHistoryData {
  payments: PaymentWithDetails[];
  totalAmount: number;
  totalPayments: number;
  todayPayments: number;
}

export default function PaymentHistoryPage() {
  const { data, isLoading, error } = useQuery<PaymentHistoryData>({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await fetch("/api/payment/history");
      if (!res.ok) throw new Error("Failed to fetch payment history");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-600">Failed to load payment history</p>
      </div>
    );
  }

  const {
    payments = [],
    totalAmount = 0,
    totalPayments = 0,
    todayPayments = 0,
  } = data || {};

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Payments", href: "/payments" },
          { label: "History", href: "/payments/history" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground">
          Complete record of all payment transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[1024px]:grid-cols-4 gap-4">
        <StatsCard
          title="Total Collected"
          value={formatCurrency(totalAmount)}
          description="All time revenue"
          icon={CreditCard}
          variant="success"
        />
        <StatsCard
          title="Total Payments"
          value={totalPayments}
          description="All transactions"
          icon={CheckCircle}
        />
        <StatsCard
          title="Today's Payments"
          value={todayPayments}
          description="Payments received today"
          icon={Calendar}
          variant="primary"
        />
        <StatsCard
          title="Average Payment"
          value={formatCurrency(Math.round(totalAmount / totalPayments || 0))}
          description="Per transaction"
          icon={TrendingUp}
        />
      </div>

      {/* Payment List */}
      <PaymentList initialPayments={payments} />
    </div>
  );
}
