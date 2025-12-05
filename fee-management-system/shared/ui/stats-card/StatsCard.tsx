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
  variant?: "default" | "primary" | "success" | "warning" | "danger";
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
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div
      className={`bg-background border border-border rounded-lg p-6 flex flex-col gap-3 shadow-sm ${className}`}
    >
      {/* Title and Icon in same row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {title}
        </span>
        <div className={`p-2 rounded-md ${variantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Value */}
      <h3 className="text-3xl font-bold text-foreground">{value}</h3>

      {/* Description and Trend */}
      <div className="flex items-center justify-between">
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full ${
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
    </div>
  );
};

export default StatsCard;
