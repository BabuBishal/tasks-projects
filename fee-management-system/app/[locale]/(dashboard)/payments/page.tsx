"use client";

import { useQuery } from "@tanstack/react-query";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import {
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import StatsCard from "@/components/ui/stats-card/StatsCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";

interface DashboardData {
  dashboardStats: {
    title: string;
    value: string;
    desc: string;
    icon: string;
  }[];
  paymentStats: {
    paid: number;
    partial: number;
    overdue: number;
    pending: number;
    total: number;
  };
  recentPayments: {
    id: string;
    studentId: string;
    studentName: string;
    amount: number;
    method: string;
    date: string;
    receiptNo: string;
  }[];
  overdueFees: {
    id: string;
    studentId: string;
    studentName: string;
    studentRollNo: string;
    program: string;
    balance: number;
    dueDate: string;
    daysOverdue: number;
  }[];
}

export default function PaymentsPage() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard-stats");
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Payments", href: "/payments" }]} />

      {/* Header with Add Payment Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of fee collection and outstanding payments
          </p>
        </div>
        <Link href="/payments/add">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Add Payment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={data.dashboardStats[0]?.value || "Rs 0"}
          icon={DollarSign}
          description={data.dashboardStats[0]?.desc || "Total fees collected"}
          variant="success"
        />
        <StatsCard
          title="Total Students"
          value={data.dashboardStats[1]?.value || "0"}
          icon={Users}
          description={
            data.dashboardStats[1]?.desc || "Total students enrolled"
          }
          variant="primary"
        />
        <StatsCard
          title="Pending Payments"
          value={data.dashboardStats[2]?.value || "Rs 0"}
          icon={Clock}
          description={data.dashboardStats[2]?.desc || "Awaiting Payments"}
          variant="warning"
        />
        <StatsCard
          title="Collection Status"
          value={data.dashboardStats[3]?.value || "0%"}
          icon={CheckCircle}
          description={data.dashboardStats[3]?.desc || "Total Payment Success"}
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* Recent Payments */}
        <Card className="col-span-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments</CardTitle>
            <Link href="/payments/history">
              <Button
                variant="secondary"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                View More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="flex-1">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Student</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  <Table.Head>Date</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.recentPayments.slice(0, 5).map((payment) => (
                  <Table.Row key={payment.id}>
                    <Table.Cell>
                      <div className="font-medium">{payment.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {payment.receiptNo}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{formatCurrency(payment.amount)}</Table.Cell>
                    <Table.Cell>{formatDate(payment.date)}</Table.Cell>
                    <Table.Cell>
                      <Link href={`/students/${payment.studentId}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </CardContent>
        </Card>

        {/* Overdue List */}
        <Card className="col-span-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Overdue Payments
            </CardTitle>
            <Link href="/payments/overdue">
              <Button
                variant="secondary"
                size="sm"
                className="text-destructive hover:text-destructive/80"
              >
                View More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="flex-1">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Student</Table.Head>
                  <Table.Head>Balance</Table.Head>
                  <Table.Head>Overdue By</Table.Head>
                  <Table.Head>Action</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.overdueFees.slice(0, 5).map((fee) => (
                  <Table.Row key={fee.id}>
                    <Table.Cell>
                      <div className="font-medium">{fee.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {fee.studentRollNo}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-destructive font-medium">
                      {formatCurrency(fee.balance)}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="danger" size="small">
                        {fee.daysOverdue} days
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Link href={`/students/${fee.studentId}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
