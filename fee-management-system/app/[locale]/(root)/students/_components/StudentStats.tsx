'use client'

import { useGetStudentsQuery } from '@/app/[locale]/(root)/students/_hooks'
import StatsCard from '@/shared/ui/stats-card/StatsCard'
import { AlertCircle, Users, Wallet } from 'lucide-react'
import { StatsSkeleton } from '../../_components/skeletons/StatsSkeleton'

export default function StudentStats() {
  const { data: allStudents, isLoading } = useGetStudentsQuery()

  if (isLoading) {
    return <StatsSkeleton />
  }

  const totalStudents = allStudents?.length || 0
  const paidStudents =
    allStudents?.filter(s => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt) ? fee : latest
            )
          : null
      return latestFee?.status === 'Paid'
    }).length || 0

  const overdueStudents =
    allStudents?.filter(s => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt) ? fee : latest
            )
          : null
      return latestFee?.status === 'Overdue'
    }).length || 0
  const pendingStudents = totalStudents - paidStudents - overdueStudents

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      <StatsCard
        title="Total Students"
        value={totalStudents}
        icon={Users}
        description="Active students in the system"
        variant="primary"
      />
      <StatsCard
        title="Paid Fees"
        value={paidStudents}
        icon={Wallet}
        description="Students with fully paid fees"
        variant="success"
      />
      <StatsCard
        title="Pending Fees"
        value={pendingStudents}
        icon={Wallet}
        description="Students with pending fees"
        variant="warning"
      />
      <StatsCard
        title="Overdue Fees"
        value={overdueStudents}
        icon={AlertCircle}
        description="Students with outstanding payments"
        variant="danger"
      />
    </div>
  )
}
