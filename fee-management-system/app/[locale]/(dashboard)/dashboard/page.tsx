// import PaymentHistory from "@/components/dashboard/PaymentHistory";
import PaymentStatusOverview from "@/components/dashboard/PaymentStatusOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsOverview from "@/components/layout/StatsOverview";
import { Users, DollarSign, Wallet2, TrendingUp } from "lucide-react";

const Dashboard = async () => {
  const res = await fetch("http://localhost:3000/api/dashboard-stats");
  const data = await res.json();
  // console.log("first", studentsData);
  const { dashboardStats, paymentStats } = data;
  // console.log("data", data?.paymentStats);
  const icons = [DollarSign, Users, Wallet2, TrendingUp];

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className=" ">
        <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
        <h4 className="text-muted text-sm">
          Overview of the fee payment system
        </h4>
      </div>
      <StatsOverview stats={dashboardStats} icons={icons} />
      <div className="flex flex-col md:flex-row gap-5">
        <PaymentStatusOverview paymentStatus={paymentStats} />
        <QuickActions />
      </div>
      {/* <PaymentHistory /> */}
    </div>
  );
};

export default Dashboard;
