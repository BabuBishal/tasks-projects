'use client'

import StatsCard from '@/shared/ui/stats-card/StatsCard'
import { DashboardStats } from '@/lib/types/api'
import { DollarSign, Users, Clock, TrendingUp } from 'lucide-react'

import { useTranslations } from 'next-intl'

const DashboardStatsOverview = ({ stats: dashboardStats }: { stats: DashboardStats[] }) => {
  const t = useTranslations('Dashboard.stats')

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title={t('totalStudents')}
        value={dashboardStats?.[1]?.value || '0'}
        icon={Users}
        description={t('totalStudentsDesc')}
        variant="primary"
      />
      <StatsCard
        title={t('totalRevenue')}
        value={dashboardStats?.[0]?.value || 'Rs 0'}
        icon={DollarSign}
        description={t('totalRevenueDesc')}
        variant="success"
      />
      <StatsCard
        title={t('pendingCollections')}
        value={dashboardStats?.[2]?.value || 'Rs 0'}
        icon={Clock}
        description={t('pendingCollectionsDesc')}
        variant="warning"
      />
      <StatsCard
        title={t('collectionRate')}
        value={dashboardStats?.[3]?.value || '0%'}
        icon={TrendingUp}
        description={t('collectionRateDesc')}
        variant="primary"
      />
    </div>
  )
}

export default DashboardStatsOverview
