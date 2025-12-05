import React from 'react'

const PaymentsSummary = ({
  totalTransactions,
  totalRevenue,
  avgTransaction,
}: {
  totalTransactions: number
  totalRevenue: number
  avgTransaction: number
}) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-primary mb-4 text-lg font-semibold">Report Summary</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-secondary/5 border-border rounded-lg border p-4">
          <p className="text-muted text-sm">Total Transactions</p>
          <p className="text-primary text-2xl font-bold">{totalTransactions.toLocaleString()}</p>
        </div>
        <div className="bg-secondary/5 border-border rounded-lg border p-4">
          <p className="text-muted text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-secondary/5 border-border rounded-lg border p-4">
          <p className="text-muted text-sm">Average Transaction Value</p>
          <p className="text-2xl font-bold text-blue-600">Rs. {avgTransaction.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentsSummary
