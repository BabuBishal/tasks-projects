"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import { TrendingUp, Users, Calendar, PieChart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/utils";

interface QuickStatsProps {
  collectionRate?: number;
  studentsPending?: number;
  upcomingDeadlines?: number;
  programDistribution?: { program: string; count: number }[];
}

export default function QuickStats({
  collectionRate = 0,
  studentsPending = 0,
  upcomingDeadlines = 0,
  programDistribution = [],
}: QuickStatsProps) {
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
          <div className="flex items-start gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-xl">
              <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted mb-2">Program Distribution</p>
              {programDistribution.length > 0 ? (
                <div className="space-y-1">
                  {programDistribution.slice(0, 3).map((prog, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-muted">{prog.program}</span>
                      <span className="font-semibold text-primary">
                        {prog.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">No data</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
