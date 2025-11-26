import { StatusBar } from "@/components/shared/status-bar/StatusBar";
import { PaymentStats } from "@/lib/types/api";
import React from "react";

const PaymentStatusOverview = ({
  paymentStats,
}: {
  paymentStats: PaymentStats;
}) => {
  return (
    <div className="w-full h-full bg-card rounded-lg shadow p-6 col-span-1">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Payment Status
      </h2>
      <div className="space-y-4">
        <StatusBar
          label="Paid"
          count={paymentStats.paid}
          total={paymentStats.total}
          color="bg-green-500"
        />

        <StatusBar
          label="Pending"
          count={paymentStats.pending}
          total={paymentStats.total}
          color="bg-blue-500"
        />
        <StatusBar
          label="Overdue"
          count={paymentStats.overdue}
          total={paymentStats.total}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export default PaymentStatusOverview;
