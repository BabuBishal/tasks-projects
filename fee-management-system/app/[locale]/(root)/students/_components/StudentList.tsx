'use client'

import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react'
import { Table } from '@/shared/ui/table/Table'
import Badge from '@/shared/ui/badges/Badges'
import { Eye, Trash2, X, ArrowRight, Pencil } from 'lucide-react'
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
import { useVirtualizer } from '@tanstack/react-virtual'
import getInfiniteStudentsQueryOptions from '../_hooks/query'
import { useInfiniteQuery } from '@tanstack/react-query'

// Memoized Student Row Component
const StudentRow = memo(
  ({
    student,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
  }: {
    student: StudentResponse
    isSelected: boolean
    onSelect: (id: string) => void
    onEdit: (student: StudentResponse) => void
    onDelete: (student: StudentResponse) => void
  }) => {
    // Memoize expensive calculations
    const feeStatus = useMemo(
      () =>
        student.status === 'Graduated' ? 'Graduated' : calculateStudentStatus(student.fees || []),
      [student.status, student.fees]
    )

    const totalPaid = useMemo(
      () =>
        student.totalPaid ?? (student.fees || []).reduce((sum: number, fee) => sum + fee.paid, 0),
      [student.totalPaid, student.fees]
    )

    const badgeVariant = useMemo(() => {
      if (feeStatus === 'Paid') return 'success'
      if (feeStatus === 'Overdue') return 'danger'
      return 'warning'
    }, [feeStatus])

    return (
      <Table.Row>
        <Table.Cell data-label="">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(student.id)}
            className="cursor-pointer"
          />
        </Table.Cell>
        <Table.Cell data-label="Roll No">{student.rollNo}</Table.Cell>
        <Table.Cell data-label="Name">{student.name}</Table.Cell>
        <Table.Cell data-label="Program">{student.program?.name || 'N/A'}</Table.Cell>
        <Table.Cell data-label="Semester">{student.semester}</Table.Cell>
        <Table.Cell data-label="Status">
          <Badge variant={badgeVariant}>{feeStatus}</Badge>
        </Table.Cell>
        <Table.Cell data-label="Total Paid">Rs. {totalPaid?.toLocaleString()}</Table.Cell>
        <Table.Cell data-label="Actions">
          <div className="flex items-center gap-2">
            <Link href={`/students/${student.id}`}>
              <Eye className="h-4 w-4 text-blue-600 hover:text-blue-800" />
            </Link>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(student)}
              className="cursor-pointer text-green-600 hover:text-green-800"
            >
              <Pencil className="h-4 w-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(student)}
              className="cursor-pointer text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </Table.Cell>
      </Table.Row>
    )
  }
)

StudentRow.displayName = 'StudentRow'

// Memoized Virtualized Row Component
const VirtualizedStudentRow = memo(
  ({
    student,
    virtualItem,
    measureElement,
    onEdit,
    onDelete,
  }: {
    student: StudentResponse
    virtualItem: { key: React.Key; index: number; start: number }
    measureElement: (node: HTMLTableRowElement | null) => void
    onEdit: (student: StudentResponse) => void
    onDelete: (student: StudentResponse) => void
  }) => {
    // Memoize status badge computation
    const statusBadge = useMemo(() => {
      const isGraduated = student.status === 'Graduated'
      return {
        variant: isGraduated ? 'info' : 'success',
        label: isGraduated ? 'Graduated' : 'Active',
      } as const
    }, [student.status])

    // Memoize fee status badge computation
    const feeStatusBadge = useMemo(() => {
      const feeStatus = calculateStudentStatus(student.fees || [])
      const variant =
        feeStatus === 'Paid' ? 'success' : feeStatus === 'Overdue' ? 'danger' : 'warning'
      return { variant, label: feeStatus } as const
    }, [student.fees])

    return (
      <tr
        key={virtualItem.key}
        data-index={virtualItem.index}
        ref={measureElement}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${virtualItem.start}px)`,
        }}
        className="flex h-16 shadow-xs hover:bg-gray-50"
      >
        <td className="flex-1 px-6 py-4 text-sm whitespace-nowrap text-gray-900">
          {student.rollNo}
        </td>
        <td className="flex-1 px-6 py-4 text-sm whitespace-nowrap text-gray-900">{student.name}</td>
        <td className="flex-1 px-6 py-4 text-sm whitespace-nowrap text-gray-500">
          {student.program?.name || 'N/A'}
        </td>
        <td className="flex-1 px-6 py-4 text-sm whitespace-nowrap text-gray-500">
          {student.semester}
        </td>
        <td className="flex-1 px-6 py-4 whitespace-nowrap">
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </td>
        <td className="flex-1 px-6 py-4 whitespace-nowrap">
          <Badge variant={feeStatusBadge.variant}>{feeStatusBadge.label}</Badge>
        </td>
        <td className="flex flex-1 items-center space-x-3 px-6 py-4 text-sm font-medium whitespace-nowrap">
          <Link href={`/students/${student.id}`}>
            <Eye className="h-4 w-4 text-blue-600 hover:text-blue-800" />
          </Link>
          <button onClick={() => onEdit(student)} className="text-green-600 hover:text-green-800">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(student)} className="text-red-600 hover:text-red-800">
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      </tr>
    )
  }
)

VirtualizedStudentRow.displayName = 'VirtualizedStudentRow'

const StudentList: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [semesterFilter, setSemesterFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<StudentResponse | null>(null)
  const [studentToEdit, setStudentToEdit] = useState<StudentResponse | null>(null)

  const debouncedSearch = useDebounce(searchQuery, 300)
  const itemsPerPage = 20

  const parentRef = useRef<HTMLTableElement>(null)

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      programId: programFilter !== 'all' ? programFilter : undefined,
      semester: semesterFilter !== 'all' ? semesterFilter : undefined,
      status: statusFilter !== 'All' ? statusFilter : undefined,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [debouncedSearch, programFilter, semesterFilter, statusFilter, currentPage]
  )

  // const { data: response, isLoading } = useGetStudentsQuery({ params: { ...params, limit: 100 } })
  const {
    data: response,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(getInfiniteStudentsQueryOptions({ params: params }))

  const { data: programsData } = useGetProgramsQuery()
  const programs = programsData || []
  const students = useMemo(
    () => response?.pages?.flatMap(page => page.data) || [],
    [response?.pages]
  )
  const meta = response?.pages?.[0]?.meta

  const virtualizer = useVirtualizer({
    count: students.length,
    estimateSize: () => 65,
    overscan: 6,
    getScrollElement: () => parentRef.current,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]
    if (!hasNextPage || isFetchingNextPage || !lastItem) return
    if (lastItem && lastItem.index >= students.length - 1 && hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, virtualItems])

  const handleSelectStudent = useCallback((studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([])
    } else {
      setSelectedStudentIds(students.map((s: StudentResponse) => s.id))
    }
  }, [selectedStudentIds.length, students])

  const clearSelection = useCallback(() => {
    setSelectedStudentIds([])
  }, [])

  const handleDeleteClick = useCallback((student: StudentResponse) => {
    setStudentToDelete(student)
  }, [])

  const handleEditClick = useCallback((student: StudentResponse) => {
    setStudentToEdit(student)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-card flex flex-col gap-4 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-secondary text-sm">Student List</span>
            <span className="text-muted text-xs">
              {isLoading
                ? 'Loading...'
                : `Showing ${students.length} of ${meta?.total || 0} students`}
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

              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                <Trash2 className="mr-1 inline h-4 w-4" />
                Delete
              </button>

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

        {isLoading && !response ? (
          <TableSkeleton columnCount={7} rowCount={10} />
        ) : students.length === 0 ? (
          <div className="text-muted py-10 text-center">
            <p>No students found matching your criteria.</p>
          </div>
        ) : (
          // <Table
          //   key={`${searchQuery}-${statusFilter}`}
          //   className="text-secondary rounded-md text-xs"
          //   pagination={{
          //     pageSize: itemsPerPage,
          //     total: meta?.total || 0,
          //     onPageChange: setCurrentPage,
          //   }}
          // >
          //   <Table.Header>
          //     <Table.Row>
          //       <Table.Head>
          //         <input
          //           type="checkbox"
          //           checked={selectedStudentIds.length === students.length}
          //           onChange={handleSelectAll}
          //           className="cursor-pointer"
          //         />
          //       </Table.Head>
          //       <Table.Head>Roll No</Table.Head>
          //       <Table.Head>Name</Table.Head>
          //       <Table.Head>Program</Table.Head>
          //       <Table.Head>Semester</Table.Head>
          //       <Table.Head>Status</Table.Head>
          //       <Table.Head>Total Paid</Table.Head>
          //       <Table.Head>Actions</Table.Head>
          //     </Table.Row>
          //   </Table.Header>
          //   <Table.Body>
          //     {students.map((student: StudentResponse) => (
          //       <StudentRow
          //         key={student.id}
          //         student={student}
          //         isSelected={selectedStudentIds.includes(student.id)}
          //         onSelect={handleSelectStudent}
          //         onEdit={handleEditClick}
          //         onDelete={handleDeleteClick}
          //       />
          //     ))}
          //   </Table.Body>
          // </Table>
          <div className="relative overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="sticky top-0 z-10 bg-gray-50">
                  <tr className="flex h-16">
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Roll No
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Program
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Semester
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Fee Status
                    </th>
                    <th className="flex-1 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div
              ref={parentRef}
              className="overflow-auto"
              style={{ height: '600px' }} // Set fixed height for scrolling
            >
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* Spacer for virtual scroll */}
                  <tr style={{ height: `${totalSize}px` }}>
                    <td style={{ position: 'relative' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                        }}
                      >
                        <table className="min-w-full">
                          <tbody>
                            {virtualItems.map(virtualItem => {
                              const student = students[virtualItem.index]
                              return (
                                <VirtualizedStudentRow
                                  key={virtualItem.key}
                                  student={student}
                                  virtualItem={virtualItem}
                                  measureElement={virtualizer.measureElement}
                                  onEdit={handleEditClick}
                                  onDelete={handleDeleteClick}
                                />
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <PromoteSemesterModal
        isOpen={isPromoteModalOpen}
        onClose={() => setIsPromoteModalOpen(false)}
        selectedStudentIds={selectedStudentIds}
        onSuccess={clearSelection}
      />

      <BulkDeleteModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        selectedStudentIds={selectedStudentIds}
        onSuccess={clearSelection}
      />

      <DeleteStudentModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        student={studentToDelete}
      />

      {studentToEdit && (
        <EditStudentModal
          key={studentToEdit.id}
          student={studentToEdit}
          isOpen={!!studentToEdit}
          onClose={() => setStudentToEdit(null)}
        />
      )}
    </div>
  )
})

StudentList.displayName = 'StudentList'

export default StudentList
