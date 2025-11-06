import Card from "../shared/stats-card/StatsCard";

const StatsOverview = ({ stats, icons }: any) => {
  console.log(icons);
  return (
    <div className="flex flex-row gap-4 flex-wrap ">
      {stats.map((stat: any, index: number) => (
        <Card key={stat.title} stats={stat} icon={icons[index]} />
      ))}
    </div>
  );
};

export default StatsOverview;
