import StatsCard from "@/components/shared/stats-card/StatsCard";
import PaymentList from "@/components/payments/PaymentList";
import { CreditCard, TrendingUp, Calendar, CheckCircle } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Payment {
  id: string;
  studentName: string;
  program: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

const page = async () => {
  const res = await fetch(`${baseUrl}/api/payment/history`, {
    cache: "no-store",
  });
  const data: Payment[] = await res.json();

  // Calculate statistics
  const totalPayments = data.length;
  const totalAmount = data.reduce(
    (sum: number, payment: Payment) => sum + payment.amount,
    0
  );

  const todayPayments = data.filter((p: Payment) => {
    const paymentDate = new Date(p.date).toDateString();
    const today = new Date().toDateString();
    return paymentDate === today;
  }).length;

  const formatCurrency = (amount: number) => `Rs ${amount.toLocaleString()}`;

  return (
    <div className="space-y-6 p-6">
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
