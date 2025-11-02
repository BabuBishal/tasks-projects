import PaymentHistory from "@/components/dashboard/PaymentHistory";
import PaymentStatusOverview from "@/components/dashboard/PaymentStatusOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsOverview from "@/components/dashboard/StatsOverview";
import Card from "@/components/ui/stats-card/StatsCard";
import { User } from "lucide-react";

const Dashboard = () => {
  const stats = {
    title: "Total Revenue",
    value: "$24,500",
    desc: "Total fees collected",
    icon: User,
    analysis: "+12% from last month",
  };
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className=" ">
        <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
        <h4 className="text-muted text-sm">
          Overview of the fee payment system
        </h4>
      </div>
      <StatsOverview stats={stats} />
      <div className="flex gap-5">
        <PaymentStatusOverview />
        <QuickActions />
      </div>
      <PaymentHistory />
    </div>
  );
};

export default Dashboard;
