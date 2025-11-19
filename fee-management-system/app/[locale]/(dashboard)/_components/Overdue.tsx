import Badge from "@/components/ui/badges/Badges";
import { OverdueFee } from "@/lib/@types/prisma";
import React from "react";

const Overdue = ({ overdueFees }: { overdueFees: OverdueFee[] }) => {
  return (
    <div className="bg-card rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Overdue Fees</h2>
      {overdueFees && overdueFees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Roll No
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Student Name
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Program
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Balance
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Due Date
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Days Overdue
                </th>
              </tr>
            </thead>
            <tbody>
              {overdueFees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-accent">
                  <td className="py-3 px-3 text-sm font-medium text-primary">
                    {fee.studentRollNo}
                  </td>
                  <td className="py-3 px-3 text-sm text-primary">
                    {fee.studentName}
                  </td>
                  <td className="py-3 px-3 text-sm text-secondary">
                    {fee.program}
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-red-600 dark:text-red-400">
                    Rs {fee.balance.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-sm text-secondary">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3 text-sm">
                    <Badge className="border-red-400! bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300 dark:border-red-600!">
                      {fee.daysOverdue} days
                    </Badge>
                    {/* <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      {fee.daysOverdue} days
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center py-4">No overdue fees 🎉</p>
      )}
    </div>
  );
};

export default Overdue;
