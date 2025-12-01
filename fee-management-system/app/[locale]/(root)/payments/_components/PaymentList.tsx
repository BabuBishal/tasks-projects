'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/Button'
import { Download, Plus } from 'lucide-react'
import Link from 'next/link'

import { useGetPaymentsQuery } from '@/hooks/query-hooks/payments'
import { TableSkeleton } from '@/app/[locale]/(root)/_components/skeletons/TableSkeleton'
import { handleExportPayments } from '@/lib/utils/export-payments'
import PaymentSearch from './PaymentSearch'
import PaymentHistory from './PaymentHistory'

const PaymentList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [methodFilter, setMethodFilter] = useState<string>('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data, isLoading } = useGetPaymentsQuery({
    params: { search: searchQuery, status: statusFilter, method: methodFilter },
  })

  // Use backend-filtered data directly
  const filteredPayments = data?.payments || []
  const filteredTotal = filteredPayments.length

  const paginatedPayments = (() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredPayments.slice(startIndex, endIndex)
  })()

  return (
    <div className="border-border bg-card flex w-full flex-col gap-5 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-secondary text-lg font-semibold">Payment Management</span>
          <span className="text-muted text-xs">Manage and view all payment records</span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportPayments(filteredPayments)}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          <Link href={'/payments/add'}>
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" /> New Payment
            </Button>
          </Link>
        </div>
      </div>

      <PaymentSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        setCurrentPage={setCurrentPage}
      />

      {/* Payment Table - show previous data while loading */}
      {isLoading && !data ? (
        <TableSkeleton />
      ) : (
        <PaymentHistory
          initialPayments={filteredPayments}
          paginatedPayments={paginatedPayments}
          filteredTotal={filteredTotal}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

export default PaymentList
