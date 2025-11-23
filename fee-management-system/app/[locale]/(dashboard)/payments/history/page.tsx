import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

// ... imports

const page = async () => {
  // ... fetch logic

  return (
    <div className="space-y-6 p-6">
      <Breadcrumb
        items={[
          { label: "Payments", href: "/payments" },
          { label: "History", href: "/payments/history" },
        ]}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payment History</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[1024px]:grid-cols-4 gap-6">
        <StatsCard
          title="Total Collected"
          amount={formatCurrency(totalAmount)}
          desc="All time revenue"
        >
          <CreditCard className="w-6 h-6 text-green-500" />
        </StatsCard>
        <StatsCard
          title="Total Payments"
          amount={totalPayments.toString()}
          desc="All transactions"
        >
          <CheckCircle className="w-6 h-6 text-green-500" />
        </StatsCard>
        <StatsCard
          title="Today's Payments"
          amount={todayPayments.toString()}
          desc="Payments received today"
        >
          <Calendar className="w-6 h-6 text-blue-500" />
        </StatsCard>
        <StatsCard
          title="Average Payment"
          amount={formatCurrency(Math.round(totalAmount / totalPayments || 0))}
          desc="Per transaction"
        >
          <TrendingUp className="w-6 h-6 text-purple-500" />
        </StatsCard>
      </div>

      {/* Payment List */}
      <PaymentList initialPayments={data} />
    </div>
  );
};

export default page;
