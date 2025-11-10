import { StatsProps } from "@/lib/@types/types";
import { LucideIcon } from "lucide-react";

type DirectStats = {
  title: string;
  value: string;
  desc: string;
  analysis?: string;
};

type CardProps =
  | (React.HTMLAttributes<HTMLDivElement> & {
      stats: DirectStats;
      icon?: LucideIcon;
    })
  | (React.HTMLAttributes<HTMLDivElement> &
      DirectStats & { icon?: LucideIcon });

const Card = (props: CardProps) => {
  // Normalize props so callers can pass either `stats={...}` or individual fields
  const { icon: Icon } = props as any;

  const stats: DirectStats =
    "stats" in props && props.stats
      ? props.stats
      : {
          title: (props as any).title,
          value: (props as any).value,
          desc: (props as any).desc,
          analysis: (props as any).analysis,
        };

  return (
    <div className="h-36 flex flex-col  flex-1 gap-2 min-w-40 max-w-72 w-full border border-border rounded-xl p-4 overflow-auto">
      <h1 className=" flex gap-2 justify-between items-center text-xs font-semibold text-secondary">
        <span>{stats?.title}</span>
        <span>{Icon && <Icon className="w-4 h-4" />}</span>
      </h1>
      <h3 className="text-lg font-semibold text-primary">{stats?.value}</h3>
      <h3 className="text-xs font-light text-muted">{stats?.desc}</h3>
      {stats?.analysis && (
        <h3 className="text-xs font-light text-muted">{stats?.analysis}</h3>
      )}
    </div>
  );
};

export default Card;
