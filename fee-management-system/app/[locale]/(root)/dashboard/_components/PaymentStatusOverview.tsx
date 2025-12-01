import { StatusBar } from '@/app/[locale]/(root)/dashboard/_components/status-bar/StatusBar'
import { PaymentStats } from '@/lib/types/api'

const PaymentStatusOverview = ({ paymentStats }: { paymentStats: PaymentStats }) => {
  return (
    <div className="bg-card col-span-1 h-full w-full rounded-lg p-6 shadow">
      <h2 className="text-primary mb-4 text-lg font-semibold">Payment Status</h2>
      <div className="space-y-4">
        <StatusBar
          label="Paid"
          count={paymentStats.paid}
          total={paymentStats.total}
          color="bg-green-500"
        />

        <StatusBar
          label="Pending"
          count={paymentStats.pending}
          total={paymentStats.total}
          color="bg-blue-500"
        />
        <StatusBar
          label="Overdue"
          count={paymentStats.overdue}
          total={paymentStats.total}
          color="bg-red-500"
        />
      </div>
    </div>
  )
}

export default PaymentStatusOverview
