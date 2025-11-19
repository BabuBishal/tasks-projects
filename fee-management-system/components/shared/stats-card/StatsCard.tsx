import { LucideIcon } from "lucide-react";

const StatsCard = ({
  children,
  title,
  amount,
  desc,
}: {
  children?: React.ReactNode;
  title: string;
  amount: string;
  desc?: string;
}) => {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-2">
        {children}
        <h3 className="text-sm font-semibold text-secondary">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-primary">{amount}</p>
      {desc && <p className="text-xs text-muted mt-1">{desc}</p>}
    </div>
  );
};

export default StatsCard;
