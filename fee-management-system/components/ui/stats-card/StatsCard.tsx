import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  variant = "default",
}) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div
      className={`bg-background border border-border rounded-lg p-6 flex flex-col gap-2 shadow-sm ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-md ${variantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div
            className={`text-xs font-medium p-2 text-center rounded-full ${
              trend.positive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {trend.positive ? "+" : ""}
            {trend.value}% {trend.label}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-sm text-muted-foreground font-medium">
          {title}
        </span>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
