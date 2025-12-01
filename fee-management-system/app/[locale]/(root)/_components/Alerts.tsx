'use client'
import { Table } from '@/shared/ui/table/Table'
import Badge from '@/shared/ui/badges/Badges'
import Link from 'next/link'
import { Button } from '@/shared/ui/button/Button'
import { ArrowRight, Eye } from 'lucide-react'
import { getUrgencyInfo, getPaymentStatusLabel } from '@/lib/utils/urgency-utils'
import { useGetOverdueFeesQuery } from '@/app/[locale]/(root)/_hooks/fees'
import { TableSkeleton } from './skeletons/TableSkeleton'

const Alerts = () => {
  const { data: overdueFees, isLoading: overDuePaymentsLoading } = useGetOverdueFeesQuery()

  if (overDuePaymentsLoading) return <TableSkeleton columnCount={6} rowCount={5} />

  if (!overdueFees) return null

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-primary text-lg font-semibold">Overdue Fees</h2>
        <Link href="/payments/overdue">
          <Button variant="secondary" size="sm">
            View More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      {overdueFees && overdueFees.length > 0 ? (
        <Table className="text-secondary rounded-md text-xs">
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
            {overdueFees.slice(0, 5).map(fee => {
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
                      Rs {fee.balance.toLocaleString()}
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
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 text-green-500" />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-muted py-4 text-center">No overdue fees 🎉</p>
      )}
    </div>
  )
}

export default Alerts
