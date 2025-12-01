'use client'

import StatsCard from '@/shared/ui/stats-card/StatsCard'
import { DashboardStats } from '@/lib/types/api'
import { DollarSign, Users, Clock, TrendingUp } from 'lucide-react'

const DashboardStatsOverview = ({ stats: dashboardStats }: { stats: DashboardStats[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Students"
        value={dashboardStats?.[1]?.value || '0'}
        icon={Users}
        description={dashboardStats?.[1]?.desc || 'Total students enrolled'}
        variant="primary"
      />
      <StatsCard
        title="Total Revenue"
        value={dashboardStats?.[0]?.value || 'Rs 0'}
        icon={DollarSign}
        description={dashboardStats?.[0]?.desc || 'Total fees collected'}
        variant="success"
      />
      <StatsCard
        title="Pending Collections"
        value={dashboardStats?.[2]?.value || 'Rs 0'}
        icon={Clock}
        description={dashboardStats?.[2]?.desc || 'Awaiting payments'}
        variant="warning"
      />
      <StatsCard
        title="Collection Rate"
        value={dashboardStats?.[3]?.value || '0%'}
        icon={TrendingUp}
        description={dashboardStats?.[3]?.desc || 'Payment success rate'}
        variant="primary"
      />
    </div>
  )
}

export default DashboardStatsOverview
