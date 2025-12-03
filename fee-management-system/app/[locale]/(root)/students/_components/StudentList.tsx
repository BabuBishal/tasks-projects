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
import StudentSearch from './StudentSearch'

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
    page: currentPage,
    limit: itemsPerPage,
  }

  const { data: response, isLoading } = useGetStudentsQuery(params)
  const { data: programsData } = useGetProgramsQuery()
  const programs = programsData || []
  const students = response?.data || []
  const meta = response?.meta

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([])
    } else {
      setSelectedStudentIds(students.map((s: StudentResponse) => s.id))
    }
  }

  const clearSelection = () => {
    setSelectedStudentIds([])
  }

  if (isLoading && !response) {
    return <TableSkeleton columnCount={6} rowCount={10} />
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-card flex flex-col gap-4 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-secondary text-sm">Student List</span>
            <span className="text-muted text-xs">
              Showing {students.length} of {meta?.total || 0} students
            </span>
          </div>
        </div>

        <StudentSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          programFilter={programFilter}
          setProgramFilter={setProgramFilter}
          semesterFilter={semesterFilter}
          setSemesterFilter={setSemesterFilter}
          programs={programs}
          setCurrentPage={setCurrentPage}
        />

        {selectedStudentIds.length > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <span className="text-sm font-medium">
              {selectedStudentIds.length} student(s) selected
            </span>
            <div className="flex gap-2">
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

        {students.length === 0 ? (
          <div className="text-muted py-10 text-center">
            <p>No students found matching your criteria.</p>
          </div>
        ) : (
          <Table
            key={`${searchQuery}-${statusFilter}`}
            className="text-secondary rounded-md text-xs"
            pagination={{
              pageSize: itemsPerPage,
              total: meta?.total || 0,
              onPageChange: setCurrentPage,
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.Head>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.length === students.length}
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
              {students.map((student: StudentResponse) => {
                const feeStatus =
                  student.status === 'Graduated'
                    ? 'Graduated'
                    : calculateStudentStatus(student.fees)
                const totalPaid = student.fees.reduce((sum: number, fee) => sum + fee.paid, 0)

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
