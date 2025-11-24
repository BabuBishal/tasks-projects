import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import type { OverdueFee } from "@/lib/@types/api";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { ArrowRight, Eye } from "lucide-react";
import { getUrgencyInfo, getPaymentStatusLabel } from "@/lib/urgency-utils";

const Overdue = ({ overdueFees }: { overdueFees: OverdueFee[] }) => {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary">Overdue Fees</h2>
        <Link href="/payments/overdue">
          <Button variant="outline" size="sm">
            View More
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      {overdueFees && overdueFees.length > 0 ? (
        <Table className="rounded-md text-xs text-secondary">
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
            {overdueFees.slice(0, 5).map((fee) => {
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
                      Rs {fee.balance.toLocaleString()}
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
                      <Button variant="ghost" size="sm">
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
        <p className="text-muted text-center py-4">No overdue fees 🎉</p>
      )}
    </div>
  );
};

export default Overdue;
