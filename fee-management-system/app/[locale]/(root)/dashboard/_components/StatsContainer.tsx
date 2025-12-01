'use client'

import DashboardStatsOverview from './DashboardStatsOverview'
import PaymentStatusOverview from './PaymentStatusOverview'
import QuickActions from './QuickActions'
import QuickStats from './QuickStats'
import { useGetDashboardStatsQuery } from '@/app/[locale]/(root)/dashboard/_hooks'
import { StatsSkeleton } from '../../_components/skeletons/StatsSkeleton'
import { PaymentStatusSkeleton } from './skeletons/PaymentStatusSkeleton'
import { QuickActionsSkeleton } from './skeletons/QuickActionSkeleton'
import { QuickStatsSkeleton } from './skeletons/QuickStatsSkeleton'

const StatsContainer = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery()

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <StatsSkeleton />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 gap-6">
            <PaymentStatusSkeleton />
          </div>
          <div className="col-span-1 gap-6">
            <QuickActionsSkeleton />
          </div>
          <div className="col-span-2">
            <QuickStatsSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    )
  }

  const {
    dashboardStats = [],
    paymentStats = { paid: 0, partial: 0, overdue: 0, pending: 0, total: 0 },
    overdueFees = [],
    programDistribution = [],
  } = data || {}

  // Calculate quick stats from existing data
  const collectionStatusStat = dashboardStats.find(s => s.title === 'Collection Status')
  const collectionRate =
    collectionStatusStat && typeof collectionStatusStat.value === 'string'
      ? (parseInt(collectionStatusStat.value) ?? 0)
      : collectionStatusStat?.value || 0
  const studentsPending = paymentStats.pending + paymentStats.overdue
  const upcomingDeadlines = overdueFees.filter(
    fee => fee.daysOverdue < 7 && fee.daysOverdue >= 0
  ).length

  return (
    <div className="flex w-full flex-col gap-4">
      <DashboardStatsOverview stats={dashboardStats} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1 gap-6">
          <PaymentStatusOverview paymentStats={paymentStats} />
        </div>
        <div className="col-span-1 gap-6">
          <QuickActions />
        </div>

        <div className="col-span-2">
          <QuickStats
            collectionRate={collectionRate}
            studentsPending={studentsPending}
            upcomingDeadlines={upcomingDeadlines}
            programDistribution={programDistribution}
          />
        </div>
      </div>
    </div>
  )
}

export default StatsContainer
