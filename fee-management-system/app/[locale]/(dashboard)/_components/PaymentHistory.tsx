import Table from "@/components/ui/table/Table";
import { RecentPayment } from "@/lib/@types/prisma";
import React from "react";

const PaymentHistory = ({ paymentData }: { paymentData: RecentPayment[] }) => {
  return (
    <div className="bg-card rounded-lg shadow p-6 col-span-2">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Recent Payments
      </h2>
      {paymentData && paymentData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Student
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Amount
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Method
                </th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-secondary">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-accent">
                  <td className="py-3 px-3 text-sm text-secondary">
                    {payment.studentName}
                  </td>
                  <td className="py-3 px-3 text-sm font-medium text-secondary">
                    Rs {payment.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-sm text-secondary">
                    {payment.method}
                  </td>
                  <td className="py-3 px-3 text-sm text-secondary">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No recent payments</p>
      )}
    </div>
  );
};

export default PaymentHistory;
