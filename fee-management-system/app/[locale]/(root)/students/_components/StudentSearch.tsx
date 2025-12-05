import { Program } from '@/lib/types'
import { Search } from 'lucide-react'
import React from 'react'

interface StudentSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  programFilter: string
  setProgramFilter: (filter: string) => void
  semesterFilter: string
  setSemesterFilter: (filter: string) => void
  programs: Program[]
  setCurrentPage: (page: number) => void
}

const StudentSearch = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  programFilter,
  setProgramFilter,
  semesterFilter,
  setSemesterFilter,
  programs,
  setCurrentPage,
}: StudentSearchProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, roll number, or phone..."
          className="border-border bg-background w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <select
          className="border-border bg-background rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Graduated">Graduated</option>
        </select>

        <select
          className="border-border bg-background rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={programFilter}
          onChange={e => {
            setProgramFilter(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="all">All Programs</option>
          {programs?.map(program => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>

        <select
          className="border-border bg-background rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={semesterFilter}
          onChange={e => {
            setSemesterFilter(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="all">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem.toString()}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default StudentSearch
