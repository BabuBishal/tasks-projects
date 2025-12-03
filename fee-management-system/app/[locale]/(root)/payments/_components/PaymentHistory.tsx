import Badge from '@/shared/ui/badges/Badges'
import { Button } from '@/shared/ui/button/Button'
import { Modal } from '@/shared/ui/modal'
import { Table } from '@/shared/ui/table'
import { paymentHeaders } from '@/lib/constants/constants'
import { PaymentHistoryItem } from '@/lib/types/api'
import { getMethodIcon } from '@/lib/utils/get-payment-method-icons'
import { handleDownloadReceipt } from '@/lib/utils/payment-receipt-download'
import { formatCurrency, formatDate } from '@/lib/utils/utils'
import { Download, Filter } from 'lucide-react'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
// import { LoadingDots } from 'l3ui'

const PaymentHistory = ({
  paginatedPayments,
  filteredTotal,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  initialPayments: PaymentHistoryItem[]
  paginatedPayments: PaymentHistoryItem[]
  filteredTotal: number
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}) => {
  // const { data } = useGetInfinitePaymentsQuery({ pageParam: currentPage })

  // console.log(data, 'data')

  // const paginatedPayments = data?.pages?.flatMap(page => page.data) || []
  console.log(
    '🚀 ~ PaymentHistory ~ paginatedPayments:',
    paginatedPayments.length,
    'of',
    filteredTotal
  )

  // State for the scrollable container element
  // const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null)

  const lastRef: React.RefCallback<HTMLTableRowElement> = useInfiniteScrollObserver({
    enabled: hasNextPage,
    onIntersect: () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage()
      }
    },
  })

  // console.log('👁️ Observer enabled:', 'Scroll container:', !!scrollContainer)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-md text-secondary font-semibold">
          Payment History ({paginatedPayments?.length})
        </div>
        <div className="text-muted text-xs">
          Showing {paginatedPayments?.length ?? '-'} of {filteredTotal ?? '-'} transactions
        </div>
      </div>

      {paginatedPayments?.length > 0 ? (
        <div className="text-secondary h-[500px] overflow-y-auto rounded-md text-xs">
          <Table>
            <Table.Header>
              <Table.Row>
                {paymentHeaders?.map((head, index) => (
                  <Table.Head key={index}>{head}</Table.Head>
                ))}
                <Table.Head>Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedPayments?.map(payment => {
                return (
                  <Table.Row key={payment.id}>
                    <Table.Cell dataLabel="PaymentID">{payment.id}</Table.Cell>
                    <Table.Cell dataLabel="Student">{payment.studentName}</Table.Cell>
                    <Table.Cell dataLabel="Program">{payment.program}</Table.Cell>
                    <Table.Cell dataLabel="Amount">{formatCurrency(payment.amount)}</Table.Cell>
                    <Table.Cell dataLabel="Date">
                      {new Date(payment.date).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell dataLabel="Method">
                      <span className="bg-background border-border flex w-fit items-center rounded border px-2 py-1 text-xs">
                        {getMethodIcon(payment.method)}
                        <span className="capitalize">{payment.method}</span>
                      </span>
                    </Table.Cell>
                    <Table.Cell dataLabel="Status">
                      <Badge
                        size="small"
                        variant={
                          payment.status === 'Partial'
                            ? 'info'
                            : payment.status === 'Paid'
                              ? 'success'
                              : 'danger'
                        }
                      >
                        {payment.status ?? '-'}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell dataLabel="Actions">
                      <Modal>
                        <Modal.Trigger asChild>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 text-blue-500" />
                          </Button>
                        </Modal.Trigger>
                        <Modal.Content>
                          <Modal.CloseIcon />
                          <Modal.Header>
                            <h2 className="text-primary text-xl font-bold">Payment Receipt</h2>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="space-y-3">
                              <div className="border-border flex justify-between border-b py-2">
                                <span className="text-muted font-medium">Receipt No:</span>
                                <span className="text-primary font-semibold">{payment.id}</span>
                              </div>
                              <div className="border-border flex justify-between border-b py-2">
                                <span className="text-muted font-medium">Date:</span>
                                <span className="text-primary">{formatDate(payment.date)}</span>
                              </div>
                              <div className="border-border flex justify-between border-b py-2">
                                <span className="text-muted font-medium">Student Name:</span>
                                <span className="text-primary">{payment.studentName}</span>
                              </div>
                              <div className="border-border flex justify-between border-b py-2">
                                <span className="text-muted font-medium">Program:</span>
                                <span className="text-primary">{payment.program}</span>
                              </div>
                              <div className="border-border flex justify-between border-b py-2">
                                <span className="text-muted font-medium">Payment Method:</span>
                                <span className="text-primary capitalize">{payment.method}</span>
                              </div>
                              <div className="flex justify-between py-2">
                                <span className="text-muted font-medium">Status:</span>
                                <Badge
                                  size="small"
                                  variant={
                                    payment.status === 'Partial'
                                      ? 'info'
                                      : payment.status === 'Paid'
                                        ? 'success'
                                        : 'danger'
                                  }
                                >
                                  {payment.status}
                                </Badge>
                              </div>
                              <div className="border-primary mt-4 flex justify-between border-t-2 py-3">
                                <span className="text-primary text-lg font-bold">Amount Paid:</span>
                                <span className="text-primary text-lg font-bold">
                                  Rs {payment.amount.toLocaleString()}
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
                )
              })}
              <Table.Row ref={lastRef} className="flex w-full items-center justify-center">
                {isFetchingNextPage ? (
                  <Table.Cell className="mx-auto text-center">Loading more payments ...</Table.Cell>
                ) : hasNextPage ? (
                  <Table.Cell className="text-center">Load more payments</Table.Cell>
                ) : (
                  <Table.Cell className="text-center">No more payments</Table.Cell>
                )}
              </Table.Row>{' '}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="text-muted mb-3 h-12 w-12" />
          <p className="text-muted mb-2 text-sm">No payments found</p>
          <p className="text-muted text-xs">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
