'use client'
import { useState } from 'react'
import { TableSkeleton } from '../../_components/skeletons/TableSkeleton'
import { Table } from '@/shared/ui/table/Table'
import { Button } from '@/shared/ui/button/Button'
import { Eye } from 'lucide-react'
import { getUrgencyInfo, getPaymentStatusLabel } from '@/lib/utils/urgency-utils'
import Link from 'next/link'
import { OverdueFee } from '@/lib/types/api'
import { formatCurrency } from '@/lib/utils/utils'
import Badge from '@/shared/ui/badges/Badges'
import { useGetOverdueFeesQuery } from '@/app/[locale]/(root)/_hooks/fees'

const Overdue = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const { data, isLoading, error } = useGetOverdueFeesQuery()

  const totalItems = data?.length
  const paginatedFees = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (isLoading) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-600">Failed to load overdue payments</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      {data && totalItems !== undefined && totalItems > 0 ? (
        <Table
          className="text-secondary rounded-md text-xs"
          pagination={{
            total: totalItems,
            pageSize: itemsPerPage,
            onPageChange: page => setCurrentPage(page),
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.Head>Student</Table.Head>
              <Table.Head>Details</Table.Head>
              <Table.Head>Balance</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Due Date</Table.Head>
              <Table.Head>Action</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedFees?.map((fee: OverdueFee) => {
              const urgency = getUrgencyInfo(fee.daysOverdue)
              return (
                <Table.Row key={fee.id}>
                  <Table.Cell>
                    <div className="font-medium">{fee.studentName}</div>
                    <div className="text-muted-foreground text-xs">{fee.program}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">Semester {fee.semester}</div>
                    <div className="text-muted-foreground text-xs">
                      {getPaymentStatusLabel(fee.paymentPercentage)} ({fee.paymentPercentage}%)
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {formatCurrency(fee.balance)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={urgency.badgeVariant} size="small">
                      {urgency.label}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{new Date(fee.dueDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link href={`/students/${fee.studentId}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-muted py-8 text-center">No overdue fees 🎉</p>
      )}
    </div>
  )
}

export default Overdue
