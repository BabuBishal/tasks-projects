import { Table } from "@/components/ui/table/Table";
import { RecentPayment } from "@/lib/@types/prisma";
import React from "react";

const PaymentHistory = ({ paymentData }: { paymentData: RecentPayment[] }) => {
  return (
    <div className="bg-card rounded-lg shadow p-6 col-span-2">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Recent Payments
      </h2>
      {paymentData && paymentData.length > 0 ? (
        <Table className="rounded-md text-xs text-secondary">
          <Table.Header>
            <Table.Row>
              <Table.Head>Student</Table.Head>
              <Table.Head>Amount</Table.Head>
              <Table.Head>Method</Table.Head>
              <Table.Head>Date</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paymentData.map((payment) => (
              <Table.Row key={payment.id}>
                <Table.Cell dataLabel="Student">
                  {payment.studentName}
                </Table.Cell>
                <Table.Cell dataLabel="Amount">
                  Rs {payment.amount.toLocaleString()}
                </Table.Cell>
                <Table.Cell dataLabel="Method">{payment.method}</Table.Cell>
                <Table.Cell dataLabel="Date">
                  {new Date(payment.date).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-gray-500 text-center py-4">No recent payments</p>
      )}
    </div>
  );
};

export default PaymentHistory;
