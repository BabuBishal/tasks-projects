"use client"

import StatsCard from "@/components/ui/stats-card/StatsCard";
import { useGetPaymentStatsQuery } from "@/hooks/query-hooks/payments";
import { DollarSign, CheckCircle, Clock } from "lucide-react";
import { StatsSkeleton } from "../../_components/skeletons/StatsSkeleton";

const PaymentStats = ({}) => {
  const { data: paymentStats, isLoading: paymentStatsLoading } =
    useGetPaymentStatsQuery();

  if (paymentStatsLoading) {
    return <StatsSkeleton />;
  }

  if (!paymentStats) return null;

  const todaysCollections = paymentStats?.todaysCollections || 0;
  const monthCollections = paymentStats?.monthCollections || 0;
  const pendingAmount = paymentStats?.pendingAmount || "Rs 0";
  const successRate = paymentStats?.paymentSuccessRate || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Today's Collections"
        value={`Rs ${todaysCollections.toLocaleString()}`}
        icon={DollarSign}
        description="Payments received today"
        variant="success"
      />
      <StatsCard
        title="This Month"
        value={`Rs ${monthCollections.toLocaleString()}`}
        icon={CheckCircle}
        description="Current month collections"
        variant="primary"
      />
      <StatsCard
        title="Pending Amount"
        value={`Rs ${pendingAmount.toLocaleString()}`}
        icon={Clock}
        description="Outstanding fees to collect"
        variant="warning"
      />
      <StatsCard
        title="Success Rate"
        value={`${successRate}%`}
        icon={CheckCircle}
        description="On-time payment rate"
        variant="primary"
      />
    </div>
  );
};

export default PaymentStats;
