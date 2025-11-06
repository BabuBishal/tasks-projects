import { StatsProps } from "@/lib/@types/types";
import { LucideIcon } from "lucide-react";

const Card = ({ stats, icon: Icon }: StatsProps & { icon: LucideIcon }) => {
  return (
    <div className="h-32 flex flex-col  flex-1 gap-2 min-w-40 max-w-72 w-full border border-border rounded-xl p-4 overflow-auto">
      <h1 className=" flex gap-2 justify-between items-center text-xs font-semibold text-secondary">
        <span>{stats?.title}</span>
        <span>
          <Icon className="w-4 h-4" />
        </span>
      </h1>
      <h3 className="text-lg font-semibold text-primary">{stats?.value}</h3>
      <h3 className="text-[10px] font-light text-muted">{stats?.desc}</h3>
      {stats?.analysis && (
        <h3 className="text-[10px] font-light text-muted">{stats?.analysis}</h3>
      )}{" "}
    </div>
  );
};

export default Card;
