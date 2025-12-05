import { PaymentStats } from '@/lib/types/api'
import { StatusBar } from './status-bar/StatusBar'

import { useTranslations } from 'next-intl'

const PaymentStatusOverview = ({ paymentStats }: { paymentStats: PaymentStats }) => {
  const t = useTranslations('Dashboard.paymentStatus')

  return (
    <div className="col-span-1 h-full w-full rounded-lg p-6 shadow">
      <h2 className="text-primary mb-4 text-lg font-semibold">{t('title')}</h2>
      <div className="space-y-4">
        <StatusBar
          label={t('paid')}
          count={paymentStats.paid}
          total={paymentStats.total}
          color="bg-green-500"
        />

        <StatusBar
          label={t('pending')}
          count={paymentStats.pending}
          total={paymentStats.total}
          color="bg-blue-500"
        />
        <StatusBar
          label={t('overdue')}
          count={paymentStats.overdue}
          total={paymentStats.total}
          color="bg-red-500"
        />
      </div>
    </div>
  )
}

export default PaymentStatusOverview
