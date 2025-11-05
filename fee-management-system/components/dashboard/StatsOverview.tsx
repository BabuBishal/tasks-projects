import Card from "../shared/stats-card/StatsCard";

const StatsOverview = ({ stats }: any) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <Card stats={stats} />
      <Card stats={stats} />
      <Card stats={stats} />
      <Card stats={stats} />
    </div>
  );
};

export default StatsOverview;
