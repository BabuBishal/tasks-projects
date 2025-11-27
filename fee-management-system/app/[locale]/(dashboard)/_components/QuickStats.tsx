"use client";

import Piechart from "@/components/piechart/piechart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import { COLORS } from "@/lib/constants/constants";
import { ProgramDistribution } from "@/lib/types";
import {
  TrendingUp,
  Users,
  Calendar,
  PieChart as PieChartIcon,
} from "lucide-react";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { formatCurrency } from "@/lib/utils/utils";

interface QuickStatsProps {
  collectionRate?: number | string;
  studentsPending?: number;
  upcomingDeadlines?: number;
  programDistribution?: ProgramDistribution[];
}


// const tooltipFormatter: TooltipFormatterFn = (value, name, props) => {
//   return [value, props?.payload?.name ?? name];
// };

export default function QuickStats({
  collectionRate = 0,
  studentsPending = 0,
  upcomingDeadlines = 0,
  programDistribution = [],
}: QuickStatsProps) {
  // const TOOLTIP_CONTENT_STYLE = useMemo(
  //   () => ({
  //     backgroundColor: "hsl(var(--card))",
  //     borderColor: "hsl(var(--border))",
  //     borderRadius: "8px",
  //   }),
  //   []
  // );

  // const TOOLTIP_ITEM_STYLE = useMemo(
  //   () => ({ color: "hsl(var(--foreground))" }),
  //   []
  // );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Quick Stats Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Collection Rate */}
          <div className="flex items-start gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Collection Rate (This Month)</p>
              <p className="text-2xl font-bold text-primary">
                {collectionRate}%
              </p>
            </div>
          </div>

          {/* Students with Pending Fees */}
          <div className="flex items-start gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded-xl">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Students with Pending Fees</p>
              <p className="text-2xl font-bold text-primary">
                {studentsPending}
              </p>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Upcoming Deadlines (7 days)</p>
              <p className="text-2xl font-bold text-primary">
                {upcomingDeadlines}
              </p>
            </div>
          </div>

          {/* Program Distribution */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
                <PieChartIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm font-medium text-muted">
                Program Distribution
              </p>
            </div>
            <div className="h-[160px] w-full">
              {programDistribution.length > 0 ? (
                <Piechart programDistribution={programDistribution} />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-muted">
                  No data
                </div>
              )}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 text-xs">
              {programDistribution.slice(0, 4).map((prog, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span
                    className="text-muted truncate max-w-[80px]"
                    title={prog.name}
                  >
                    {prog.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
