import { DashboardStats } from "@/lib/@types/prisma";
import Card from "../../../../components/shared/stats-card/StatsCard";

const StatsOverview = ({
  dashboardStats,
}: {
  dashboardStats: DashboardStats[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {dashboardStats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
          </div>
          <h3 className="text-sm font-semibold text-secondary mb-1">
            {stat.title}
          </h3>
          <p className="text-xs text-muted">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
