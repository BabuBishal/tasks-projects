import { LucideIcon } from "lucide-react";

export type StatsProps = React.HTMLAttributes<HTMLDivElement> & {
  stats: {
    title: string;
    value: string;
    desc: string;
    icon: LucideIcon;
    analysis: string;
  };
};
