'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { Download, Plus } from 'lucide-react'
import Link from 'next/link'

import { useGetInfinitePaymentsQuery } from '@/app/[locale]/(root)/payments/_hooks'
import { TableSkeleton } from '@/app/[locale]/(root)/_components/skeletons/TableSkeleton'
import { handleExportPayments } from '@/lib/utils/export-payments'
import PaymentSearch from './PaymentSearch'
import PaymentHistory from './PaymentHistory'

const PaymentList = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [methodFilter, setMethodFilter] = useState<string>('')

  const itemsPerPage = 10

  const {
    data: paymentsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfinitePaymentsQuery({
    params: {
      search: searchQuery,
      status: statusFilter,
      method: methodFilter,
      limit: itemsPerPage,
    },
  })

  // Flatten all pages into a single array
  const infinitePayments = useMemo(
    () => paymentsData?.pages?.flatMap(page => page.data) || [],
    [paymentsData?.pages]
  )

  // Get total from the first page's meta
  const totalPayments = paymentsData?.pages?.[0]?.meta?.total || 0

  // Get initial payments (first page)
  const initialPayments = paymentsData?.pages?.[0]?.data || []

  const handleExport = useCallback(() => {
    handleExportPayments(infinitePayments)
  }, [infinitePayments])

  return (
    <div className="border-border bg-card flex w-full flex-col gap-5 rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-secondary text-lg font-semibold">Payment Management</span>
          <span className="text-muted text-xs">Manage and view all payment records</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
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
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <PaymentHistory
          initialPayments={initialPayments}
          paginatedPayments={infinitePayments}
          filteredTotal={totalPayments}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  )
})

PaymentList.displayName = 'PaymentList'

export default PaymentList
