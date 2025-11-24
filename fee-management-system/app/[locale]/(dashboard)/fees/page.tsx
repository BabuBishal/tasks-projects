"use client";

import { useGetDashboardStats } from "@/lib/services/queries/getDashboardStats.queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { getUrgencyInfo, getPaymentStatusLabel } from "@/lib/urgency-utils";

export default function FeesPage() {
  const { data, isLoading } = useGetDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) return null;

  const {
    dashboardStats = [],
    recentPayments = [],
    overdueFees = [],
  } = data || {};

  const statsIcons = {
    "Total Revenue": DollarSign,
    "Total Students": Users,
    "Pending Payments": Clock,
    "Collection Status": CheckCircle,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of fee collection and outstanding payments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat: any, index: number) => {
          const Icon =
            statsIcons[stat.title as keyof typeof statsIcons] || DollarSign;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Student</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  <Table.Head>Date</Table.Head>
                  <Table.Head>Method</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {recentPayments.map((payment: any) => (
                  <Table.Row key={payment.id}>
                    <Table.Cell>
                      <div className="font-medium">{payment.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {payment.receiptNo}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{formatCurrency(payment.amount)}</Table.Cell>
                    <Table.Cell>{formatDate(payment.date)}</Table.Cell>
                    <Table.Cell className="capitalize">
                      {payment.method}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </CardContent>
        </Card>

        {/* Overdue List */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Overdue Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Student</Table.Head>
                  <Table.Head>Details</Table.Head>
                  <Table.Head>Balance</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {overdueFees.map((fee: any) => {
                  const urgency = getUrgencyInfo(fee.daysOverdue);
                  return (
                    <Table.Row key={fee.id}>
                      <Table.Cell>
                        <div className="font-medium">{fee.studentName}</div>
                        <div className="text-xs text-muted-foreground">
                          {fee.program}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm">Semester {fee.semester}</div>
                        <div className="text-xs text-muted-foreground">
                          {getPaymentStatusLabel(fee.paymentPercentage)} (
                          {fee.paymentPercentage}%)
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-destructive font-medium">
                        {formatCurrency(fee.balance)}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={urgency.badgeVariant} size="small">
                          {urgency.label}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/students/${fee.studentId}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
