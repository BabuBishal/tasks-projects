'use client'

import React, { useState } from 'react'
import { Table } from '@/shared/ui/table/Table'
import Badge from '@/shared/ui/badges/Badges'
import { Eye, Search, Trash2, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { calculateStudentStatus } from '@/lib/utils/status-utils'
import { useGetProgramsQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { TableSkeleton } from '@/app/[locale]/(root)/_components/skeletons/TableSkeleton'
import { useGetStudentsQuery } from '@/app/[locale]/(root)/students/_hooks'
import PromoteSemesterModal from './modals/PromoteSemesterModal'
import EditStudentModal from './modals/EditStudentModal'
import BulkDeleteModal from './modals/BulkDeleteModal'
import DeleteStudentModal from './modals/DeleteStudentModal'
import { StudentResponse } from '@/lib/types/api'

const StudentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [semesterFilter, setSemesterFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<StudentResponse | null>(null)

  const debouncedSearch = useDebounce(searchQuery, 300)
  const itemsPerPage = 10

  const params = {
    search: debouncedSearch,
    programId: programFilter !== 'all' ? programFilter : undefined,
    semester: semesterFilter !== 'all' ? semesterFilter : undefined,
    status: statusFilter !== 'All' ? statusFilter : undefined,
  }

  const { data: students, isLoading } = useGetStudentsQuery(params)
  const { data: programs } = useGetProgramsQuery()

  const filteredStudents = students || []
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.max(1, Math.ceil(filteredStudents?.length / itemsPerPage))
  console.log(totalPages)

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedStudentIds.length === paginatedStudents.length) {
      setSelectedStudentIds([])
    } else {
      setSelectedStudentIds(paginatedStudents.map(s => s.id))
    }
  }

  const clearSelection = () => {
    setSelectedStudentIds([])
  }

  if (isLoading && !students) {
    return <TableSkeleton columnCount={6} rowCount={10} />
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-card flex flex-col gap-4 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-secondary text-sm">Student List</span>
            <span className="text-muted text-xs">
              Showing {paginatedStudents.length} of {filteredStudents.length} students
            </span>
          </div>
        </div>

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

        {selectedStudentIds.length > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <span className="text-sm font-medium">
              {selectedStudentIds.length} student(s) selected
            </span>
            <div className="flex gap-2">
              {/* Bulk Promote Modal */}
              <button
                onClick={() => setIsPromoteModalOpen(true)}
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              >
                <ArrowRight className="mr-1 inline h-4 w-4" />
                Promote
              </button>

              <PromoteSemesterModal
                isOpen={isPromoteModalOpen}
                onClose={() => setIsPromoteModalOpen(false)}
                selectedStudentIds={selectedStudentIds}
                onSuccess={clearSelection}
              />

              {/* Bulk Delete Modal */}
              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                <Trash2 className="mr-1 inline h-4 w-4" />
                Delete
              </button>

              <BulkDeleteModal
                isOpen={isBulkDeleteModalOpen}
                onClose={() => setIsBulkDeleteModalOpen(false)}
                selectedStudentIds={selectedStudentIds}
                onSuccess={clearSelection}
              />

              <button
                onClick={clearSelection}
                className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                <X className="mr-1 inline h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        )}

        {paginatedStudents.length === 0 ? (
          <div className="text-muted py-10 text-center">
            <p>No students found matching your criteria.</p>
          </div>
        ) : (
          <Table
            key={`${searchQuery}-${statusFilter}`}
            className="text-secondary rounded-md text-xs"
            pagination={{
              pageSize: itemsPerPage,
              total: filteredStudents.length,
              onPageChange: setCurrentPage,
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.Head>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.length === paginatedStudents.length}
                    onChange={handleSelectAll}
                    className="cursor-pointer"
                  />
                </Table.Head>
                <Table.Head>Roll No</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Program</Table.Head>
                <Table.Head>Semester</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Total Paid</Table.Head>
                <Table.Head>Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedStudents.map(student => {
                const feeStatus =
                  student.status === 'Graduated'
                    ? 'Graduated'
                    : calculateStudentStatus(student.fees)
                const totalPaid = student.fees.reduce((sum, fee) => sum + fee.paid, 0)

                return (
                  <Table.Row key={student.id}>
                    <Table.Cell data-label="">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="cursor-pointer"
                      />
                    </Table.Cell>
                    <Table.Cell data-label="Roll No">{student.rollNo}</Table.Cell>
                    <Table.Cell data-label="Name">{student.name}</Table.Cell>
                    <Table.Cell data-label="Program">{student.program?.name || 'N/A'}</Table.Cell>
                    <Table.Cell data-label="Semester">{student.semester}</Table.Cell>
                    <Table.Cell data-label="Status">
                      <Badge
                        variant={
                          feeStatus === 'Paid'
                            ? 'success'
                            : feeStatus === 'Overdue'
                              ? 'danger'
                              : 'warning'
                        }
                      >
                        {feeStatus}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell data-label="Total Paid">
                      Rs. {totalPaid.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell data-label="Actions">
                      <div className="flex items-center gap-2">
                        <Link href={`/students/${student.id}`}>
                          <Eye className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                        </Link>

                        {/* Edit Modal */}
                        <EditStudentModal student={student} />

                        {/* Delete Modal */}
                        <button
                          onClick={() => setStudentToDelete(student)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        )}
      </div>

      <DeleteStudentModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        student={studentToDelete}
      />
    </div>
  )
}

export default StudentList
