'use client'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const PaymentSearch = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  methodFilter: string
  setMethodFilter: (filter: string) => void
}) => {
  const [searchText, setSearchText] = useState(searchQuery)

  const debouncedSearchText = useDebounce(searchText, 400)

  useEffect(() => {
    setSearchQuery(debouncedSearchText)
  }, [debouncedSearchText, setSearchQuery])

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by student name, ID..."
          className="border-border bg-background w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value)
          }}
        />
      </div>
      <div className="flex gap-2">
        <select
          className="border-border bg-background rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value)
          }}
        >
          <option value="">All Status</option>
          <option value="completed">Fully Paid</option>
          <option value="partial">Partially Paid</option>
          {/* <option value="Overdue">Overdue</option> */}
        </select>
        <select
          className="border-border bg-background rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={methodFilter}
          onChange={e => {
            setMethodFilter(e.target.value)
          }}
        >
          <option value="">All Methods</option>
          <option value="cash">Cash</option>
          <option value="bank">Bank </option>
          <option value="online">Online</option>
        </select>
      </div>
    </div>
  )
}

export default PaymentSearch
