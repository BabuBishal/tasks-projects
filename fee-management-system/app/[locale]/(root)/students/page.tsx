'use client'

import { Button } from '@/components/ui/button/Button'
import { TableSkeleton } from '@/app/[locale]/(root)/_components/skeletons/TableSkeleton'
import { Plus, Users, Wallet, AlertCircle, Upload, Download, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/ui/stats-card/StatsCard'
import StudentList from '@/components/students/StudentList'
import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import { DropdownMenu } from '@/components/ui/dropdown-menu/DropdownMenu'
import { StatsSkeleton } from '../_components/skeletons/StatsSkeleton'
import { useGetStudentsQuery } from '@/hooks/query-hooks/students'

const Students = () => {
  const router = useRouter()
  const { data: students, isLoading, error } = useGetStudentsQuery()
  // console.log(students)
  

  if (isLoading) {
    return (
      <div className="mt-20 flex h-full w-full flex-col gap-4">
        <StatsSkeleton />
        <TableSkeleton columnCount={6} rowCount={10} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">Error Loading Students</h2>
          <p className="text-muted">Failed to fetch student data. Please try again later.</p>
        </div>
      </div>
    )
  }

  // Calculate statistics
  const totalStudents = students?.length || 0
  const paidStudents =
    students?.filter(s => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt) ? fee : latest
            )
          : null
      return latestFee?.status === 'Paid'
    }).length || 0

  const overdueStudents =
    students?.filter(s => {
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
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Students', href: '/students' }]} />

      <div className="flex items-end justify-between gap-5">
        <div>
          <h1 className="text-primary text-2xl font-bold">Students</h1>
          <h4 className="text-muted text-sm">Manage students, fees, and academic records</h4>
        </div>
        <div className="flex gap-2">
          <DropdownMenu
            trigger={
              <Button variant="outline" size="sm">
                Actions
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            }
          >
            <DropdownMenu.Item
              onClick={() => router.push('/students/bulk?tab=import')}
              icon={<Upload className="h-4 w-4" />}
            >
              Import Students
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => router.push('/students/bulk?tab=export')}
              icon={<Download className="h-4 w-4" />}
            >
              Export Students
            </DropdownMenu.Item>
          </DropdownMenu>
          <Link href="/students/add">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>

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

      <StudentList initialStudents={students || []} />
    </div>
  )
}

export default Students
