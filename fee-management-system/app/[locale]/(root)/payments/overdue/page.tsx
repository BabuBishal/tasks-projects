"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/utils";
import type { OverdueFee } from "@/lib/types/api";
import {
  getUrgencyInfo,
  getPaymentStatusLabel,
} from "@/lib/utils/urgency-utils";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useGetOverdueFeesQuery } from "@/hooks/query-hooks/fees";

export default function OverduePaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useGetOverdueFeesQuery();

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

  const totalItems = data?.length;
  const paginatedFees = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        {data && data.length > 0 ? (
          <Table
            className="rounded-md text-xs text-secondary"
            pagination={{
              total: totalItems,
              pageSize: itemsPerPage,
              onPageChange: (page) => setCurrentPage(page),
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.Head>Student</Table.Head>
                <Table.Head>Details</Table.Head>
                <Table.Head>Balance</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Due Date</Table.Head>
                <Table.Head>Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedFees.map((fee: OverdueFee) => {
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
                    <Table.Cell>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(fee.balance)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={urgency.badgeVariant} size="small">
                        {urgency.label}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(fee.dueDate).toLocaleDateString()}
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
        ) : (
          <p className="text-muted text-center py-8">No overdue fees 🎉</p>
        )}
      </div>
    </div>
  );
}
