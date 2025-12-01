"use client";

import { Card, CardContent } from "@/components/ui/card/Card";
import { BookOpen, Coins, GraduationCap, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/utils";

interface FeeStatsProps {
  totalPrograms: number;
  totalSemesters: number;
  averageFee: number;
  totalFeeStructures: number;
}

export default function FeeStats({
  totalPrograms,
  totalSemesters,
  averageFee,
  totalFeeStructures,
}: FeeStatsProps) {
  const stats = [
    {
      title: "Total Programs",
      value: totalPrograms,
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Active Semesters",
      value: totalSemesters,
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Fee Structures",
      value: totalFeeStructures,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Average Fee",
      value: formatCurrency(averageFee),
      icon: Coins,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-l-4 ${stat.borderColor} hover:shadow-md transition-shadow`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
