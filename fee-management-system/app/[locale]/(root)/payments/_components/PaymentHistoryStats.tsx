'use client'

import StatsCard from '@/shared/ui/stats-card/StatsCard'
import { useGetPaymentsQuery } from '@/app/[locale]/(root)/payments/_hooks'
import { formatCurrency } from '@/lib/utils/utils'
import { Calendar, CheckCircle, CreditCard, TrendingUp } from 'lucide-react'
import { StatsSkeleton } from '../../_components/skeletons/StatsSkeleton'

const PaymentHistoryStats = () => {
  const { data, isLoading, error } = useGetPaymentsQuery({})

  const { totalAmount = 0, totalPayments = 0, todayPayments = 0 } = data || {}

  if (isLoading) return <StatsSkeleton />

  if (error || !data) return null

  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[1024px]:grid-cols-4">
      <StatsCard
        title="Total Collected"
        value={formatCurrency(totalAmount)}
        description="All time revenue"
        icon={CreditCard}
        variant="success"
      />
      <StatsCard
        title="Total Payments"
        value={totalPayments}
        description="All transactions"
        icon={CheckCircle}
      />
      <StatsCard
        title="Today's Payments"
        value={todayPayments}
        description="Payments received today"
        icon={Calendar}
        variant="primary"
      />
      <StatsCard
        title="Average Payment"
        value={formatCurrency(Math.round(totalAmount / totalPayments || 0))}
        description="Per transaction"
        icon={TrendingUp}
      />
    </div>
  )
}

export default PaymentHistoryStats
