import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { OverdueFee } from "@/lib/@types/prisma";
import React from "react";

const Overdue = ({ overdueFees }: { overdueFees: OverdueFee[] }) => {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Overdue Fees</h2>
      {overdueFees && overdueFees.length > 0 ? (
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
            {overdueFees.map((fee) => (
              <Table.Row key={fee.id}>
                <Table.Cell dataLabel="Roll No">{fee.studentRollNo}</Table.Cell>
                <Table.Cell dataLabel="Student Name">
                  {fee.studentName}
                </Table.Cell>
                <Table.Cell dataLabel="Program">{fee.program}</Table.Cell>
                <Table.Cell dataLabel="Balance">
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Rs {fee.balance.toLocaleString()}
                  </span>
                </Table.Cell>
                <Table.Cell dataLabel="Due Date">
                  {new Date(fee.dueDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell dataLabel="Days Overdue">
                  <Badge className="border-red-400! bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300 dark:border-red-600!">
                    {fee.daysOverdue} days
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-muted text-center py-4">No overdue fees 🎉</p>
      )}
    </div>
  );
};

export default Overdue;
