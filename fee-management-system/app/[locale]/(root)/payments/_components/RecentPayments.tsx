'use client'

import { Table } from '@/shared/ui/table/Table'
import Link from 'next/link'
import { Button } from '@/shared/ui/button/Button'
import { ArrowRight, Download } from 'lucide-react'
import { Card } from '@/shared/ui/card/Card'
import { CardContent } from '@/shared/ui/card/Card'
import { CardHeader } from '@/shared/ui/card/Card'
import { CardTitle } from '@/shared/ui/card/Card'
import { formatCurrency, formatDate } from '@/lib/utils/utils'
import { Modal } from '@/shared/ui/modal'
import { useGetPaymentsQuery } from '@/app/[locale]/(root)/payments/_hooks'
import { TableSkeleton } from '../../_components/skeletons/TableSkeleton'
import { handleDownloadReceipt } from '@/lib/utils/payment-receipt-download'

const RecentPayments = () => {
  const { data: paymentsData, isLoading: recentPaymentsLoading } = useGetPaymentsQuery({})
  console.log(paymentsData)
  const recentPayments = paymentsData?.data?.slice(0, 5)

  if (recentPaymentsLoading) {
    return <TableSkeleton columnCount={6} rowCount={5} />
  }

  if (!paymentsData) return null

  return (
    <Card className="col-span-1 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <Link href="/payments/history">
          <Button variant="secondary" size="sm" className="text-primary hover:text-primary/80">
            View More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Student</Table.Head>
              <Table.Head>Program</Table.Head>
              <Table.Head>Year</Table.Head>
              <Table.Head>Amount</Table.Head>
              <Table.Head>Date</Table.Head>
              <Table.Head>Action</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {recentPayments &&
              recentPayments.length > 0 &&
              recentPayments.map(payment => (
                <Table.Row key={payment.id}>
                  <Table.Cell>
                    <div className="font-medium">{payment.studentName ?? '-'}</div>
                    <div className="text-muted-foreground text-xs">{payment.receiptNo ?? '-'}</div>
                  </Table.Cell>
                  <Table.Cell>{payment.program}</Table.Cell>
                  <Table.Cell>{payment.academicYear}</Table.Cell>
                  <Table.Cell>{formatCurrency(payment.amount ?? 0)}</Table.Cell>
                  <Table.Cell>{new Date(payment.date ?? '-').toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Modal>
                      <Modal.Trigger asChild>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 text-blue-500" />
                        </Button>
                      </Modal.Trigger>
                      <Modal.Content className="max-w-2xl">
                        <Modal.CloseIcon />
                        <Modal.Header>
                          <h2 className="text-primary text-xl font-bold">Payment Receipt</h2>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="space-y-3">
                            <div className="border-border flex justify-between border-b py-2">
                              <span className="text-muted font-medium">Receipt No:</span>
                              <span className="text-primary font-semibold">
                                {payment.receiptNo || payment.id}
                              </span>
                            </div>
                            <div className="border-border flex justify-between border-b py-2">
                              <span className="text-muted font-medium">Date:</span>
                              <span className="text-primary">{formatDate(payment.date ?? '')}</span>
                            </div>
                            <div className="border-border flex justify-between border-b py-2">
                              <span className="text-muted font-medium">Student Name:</span>
                              <span className="text-primary">{payment.studentName}</span>
                            </div>
                            <div className="border-border flex justify-between border-b py-2">
                              <span className="text-muted font-medium">Year:</span>
                              <span className="text-primary">{payment?.academicYear}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-muted font-medium">Payment Method:</span>
                              <span className="text-primary capitalize">{payment.method}</span>
                            </div>
                            <div className="border-primary mt-4 flex justify-between border-t-2 py-3">
                              <span className="text-primary text-lg font-bold">Amount Paid:</span>
                              <span className="text-primary text-lg font-bold">
                                {formatCurrency(payment.amount ?? 0)}
                              </span>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="flex gap-3">
                            <Modal.Close>Close</Modal.Close>
                            <Button
                              variant="primary"
                              className="flex-1"
                              onClick={() => handleDownloadReceipt(payment)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentPayments
