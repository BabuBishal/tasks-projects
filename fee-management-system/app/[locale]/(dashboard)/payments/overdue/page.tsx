"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { OverdueFee } from "@/lib/@types/prisma";

interface OverdueData {
  overdueFees: OverdueFee[];
}

export default function OverduePaymentsPage() {
  const { data, isLoading, error } = useQuery<OverdueData>({
    queryKey: ["overdue-payments"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard-stats");
      if (!res.ok) throw new Error("Failed to fetch overdue payments");
      const dashboardData = await res.json();
      return { overdueFees: dashboardData.overdueFees };
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-600">Failed to load overdue payments</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Payments", href: "/payments" },
          { label: "Overdue", href: "/payments/overdue" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          Overdue Payments
        </h1>
        <p className="text-muted-foreground">
          Students with outstanding payments past due date
        </p>
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        {data.overdueFees && data.overdueFees.length > 0 ? (
          <Table className="rounded-md text-xs text-secondary">
            <Table.Header>
              <Table.Row>
                <Table.Head>Roll No</Table.Head>
                <Table.Head>Student Name</Table.Head>
                <Table.Head>Program</Table.Head>
                <Table.Head>Balance</Table.Head>
                <Table.Head>Due Date</Table.Head>
                <Table.Head>Days Overdue</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.overdueFees.map((fee) => (
                <Table.Row key={fee.id}>
                  <Table.Cell dataLabel="Roll No">
                    {fee.studentRollNo}
                  </Table.Cell>
                  <Table.Cell dataLabel="Student Name">
                    {fee.studentName}
                  </Table.Cell>
                  <Table.Cell dataLabel="Program">{fee.program}</Table.Cell>
                  <Table.Cell dataLabel="Balance">
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {formatCurrency(fee.balance)}
                    </span>
                  </Table.Cell>
                  <Table.Cell dataLabel="Due Date">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell dataLabel="Days Overdue">
                    <Badge variant="danger" size="small">
                      {fee.daysOverdue} days
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <p className="text-muted text-center py-8">No overdue fees 🎉</p>
        )}
      </div>
    </div>
  );
}
