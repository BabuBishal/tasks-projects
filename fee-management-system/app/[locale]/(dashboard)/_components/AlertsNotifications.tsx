"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import { AlertTriangle, DollarSign, UserX, FileWarning } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import Badge from "@/components/ui/badges/Badges";

interface Alert {
  id: string;
  type: "critical_overdue" | "zero_payment" | "scholarship_pending";
  studentId: string;
  studentName: string;
  message: string;
  amount?: number;
  daysOverdue?: number;
}

interface AlertsNotificationsProps {
  alerts?: Alert[];
}

export default function AlertsNotifications({
  alerts = [],
}: AlertsNotificationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "critical_overdue":
        return (
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
        );
      case "zero_payment":
        return (
          <UserX className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        );
      case "scholarship_pending":
        return (
          <FileWarning className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        );
      default:
        return (
          <AlertTriangle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "critical_overdue":
        return "bg-red-100 dark:bg-red-950";
      case "zero_payment":
        return "bg-orange-100 dark:bg-orange-950";
      case "scholarship_pending":
        return "bg-yellow-100 dark:bg-yellow-950";
      default:
        return "bg-gray-100 dark:bg-gray-950";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "critical_overdue":
        return "error";
      case "zero_payment":
        return "warning";
      case "scholarship_pending":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 mb-3">
              <AlertTriangle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-muted">No critical alerts at the moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${getBackgroundColor(alert.type)}`}
                >
                  {getIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-primary">
                      {alert.studentName}
                    </p>
                    {alert.daysOverdue && alert.daysOverdue > 30 && (
                      <Badge variant={getBadgeVariant(alert.type)} size="sm">
                        {alert.daysOverdue} days overdue
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted">{alert.message}</p>
                  {alert.amount && (
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 mt-1">
                      {formatCurrency(alert.amount)}
                    </p>
                  )}
                </div>
                <Link href={`/students/${alert.studentId}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            ))}
            {alerts.length > 5 && (
              <Link href="/overdue" className="block">
                <Button variant="secondary" className="w-full mt-2">
                  View All Alerts ({alerts.length})
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
