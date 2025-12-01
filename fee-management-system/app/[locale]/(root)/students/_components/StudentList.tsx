'use client'

import React, { useState } from 'react'
import { Table } from '@/shared/ui/table/Table'
import Badge from '@/shared/ui/badges/Badges'
import { Eye, Search, Pencil, Trash2, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { calculateStudentStatus } from '@/lib/utils/status-utils'
import { useGetProgramsQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { TableSkeleton } from '@/app/[locale]/(root)/_components/skeletons/TableSkeleton'
import {
  useGetStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useBulkDeleteStudentsMutation,
  usePromoteSemesterMutation,
} from '@/app/[locale]/(root)/students/_hooks'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { useToast } from '@/shared/ui/toast'

const StudentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [semesterFilter, setSemesterFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([])

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

  const updateMutation = useUpdateStudentMutation()
  const deleteMutation = useDeleteStudentMutation()
  const bulkDeleteMutation = useBulkDeleteStudentsMutation()
  const promoteMutation = usePromoteSemesterMutation()
  const { notify } = useToast()

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
              <Modal>
                <Modal.Trigger asChild>
                  <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                    <ArrowRight className="mr-1 inline h-4 w-4" />
                    Promote
                  </button>
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.CloseIcon />
                  <Modal.Header>
                    <h2 className="text-xl font-bold">Promote Students</h2>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-muted">
                      Are you sure you want to promote{' '}
                      <strong>{selectedStudentIds.length} students</strong> to the next semester?
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="flex justify-end gap-2">
                      <Modal.Close>Cancel</Modal.Close>
                      <Button
                        onClick={async () => {
                          try {
                            await promoteMutation.mutateAsync({ studentIds: selectedStudentIds })
                            notify({
                              title: 'Success',
                              description: `${selectedStudentIds.length} students promoted`,
                              type: 'success',
                            })
                            clearSelection()
                          } catch {
                            notify({
                              title: 'Error',
                              description: 'Failed to promote students',
                              type: 'error',
                            })
                          }
                        }}
                        variant="primary"
                      >
                        Promote {selectedStudentIds.length} Students
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

              {/* Bulk Delete Modal */}
              <Modal>
                <Modal.Trigger asChild>
                  <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                    <Trash2 className="mr-1 inline h-4 w-4" />
                    Delete
                  </button>
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.CloseIcon />
                  <Modal.Header>
                    <h2 className="text-xl font-bold text-red-600">Delete Multiple Students</h2>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-muted">
                      Are you sure you want to delete{' '}
                      <strong>{selectedStudentIds.length} students</strong>? This action cannot be
                      undone.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="flex justify-end gap-2">
                      <Modal.Close>Cancel</Modal.Close>
                      <Button
                        onClick={async () => {
                          try {
                            await bulkDeleteMutation.mutateAsync(selectedStudentIds)
                            notify({
                              title: 'Success',
                              description: `${selectedStudentIds.length} students deleted`,
                              type: 'success',
                            })
                            clearSelection()
                          } catch {
                            notify({
                              title: 'Error',
                              description: 'Failed to delete students',
                              type: 'error',
                            })
                          }
                        }}
                        variant="danger"
                      >
                        Delete {selectedStudentIds.length} Students
                      </Button>
                    </div>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

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
                        <Modal>
                          <Modal.Trigger asChild>
                            <button className="text-green-600 hover:text-green-800">
                              <Pencil className="h-4 w-4" />
                            </button>
                          </Modal.Trigger>
                          <Modal.Content>
                            <Modal.CloseIcon />
                            <Modal.Header>
                              <h2 className="text-xl font-bold">Edit Student</h2>
                            </Modal.Header>
                            <Modal.Body>
                              <form
                                className="space-y-4"
                                onSubmit={async e => {
                                  e.preventDefault()
                                  const formData = new FormData(e.currentTarget)
                                  try {
                                    await updateMutation.mutateAsync({
                                      id: student.id,
                                      data: {
                                        name: formData.get('name') as string,
                                        email: formData.get('email') as string,
                                        programId: formData.get('programId') as string,
                                        semester: parseInt(formData.get('semester') as string),
                                        phone: formData.get('phone') as string,
                                        address: formData.get('address') as string,
                                        status:
                                          (formData.get('graduated') as string) === 'on'
                                            ? 'Graduated'
                                            : 'Active',
                                      },
                                    })
                                    notify({
                                      title: 'Success',
                                      description: 'Student updated',
                                      type: 'success',
                                    })
                                  } catch {
                                    notify({
                                      title: 'Error',
                                      description: 'Failed to update',
                                      type: 'error',
                                    })
                                  }
                                }}
                              >
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Name</label>
                                  <input
                                    name="name"
                                    defaultValue={student.name}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Email</label>
                                  <input
                                    name="email"
                                    type="email"
                                    defaultValue={student.email}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Program</label>
                                  <select
                                    name="programId"
                                    defaultValue={student.programId}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  >
                                    {programs?.map(p => (
                                      <option key={p.id} value={p.id}>
                                        {p.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Semester</label>
                                  <input
                                    name="semester"
                                    type="number"
                                    defaultValue={student.semester}
                                    min="1"
                                    max="8"
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Phone</label>
                                  <input
                                    name="phone"
                                    defaultValue={student.phone}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="mb-1 block text-sm font-medium">Address</label>
                                  <input
                                    name="address"
                                    defaultValue={student.address}
                                    className="w-full rounded-md border px-3 py-2"
                                    required
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    name="graduated"
                                    defaultChecked={student.status === 'Graduated'}
                                    id={`grad-${student.id}`}
                                  />
                                  <label
                                    htmlFor={`grad-${student.id}`}
                                    className="text-sm font-medium"
                                  >
                                    Graduated
                                  </label>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                  <Modal.Close>Cancel</Modal.Close>
                                  <Button type="submit" variant="primary">
                                    Save Changes
                                  </Button>
                                </div>
                              </form>
                            </Modal.Body>
                          </Modal.Content>
                        </Modal>

                        {/* Delete Modal */}
                        <Modal>
                          <Modal.Trigger asChild>
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </Modal.Trigger>
                          <Modal.Content>
                            <Modal.CloseIcon />
                            <Modal.Header>
                              <h2 className="text-xl font-bold text-red-600">Delete Student</h2>
                            </Modal.Header>
                            <Modal.Body>
                              <p className="text-muted">
                                Are you sure you want to delete <strong>{student.name}</strong>?
                                This action cannot be undone.
                              </p>
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="flex justify-end gap-2">
                                <Modal.Close>Cancel</Modal.Close>
                                <Button
                                  onClick={async () => {
                                    try {
                                      await deleteMutation.mutateAsync(student.id)
                                      notify({
                                        title: 'Success',
                                        description: 'Student deleted',
                                        type: 'success',
                                      })
                                    } catch {
                                      notify({
                                        title: 'Error',
                                        description: 'Failed to delete',
                                        type: 'error',
                                      })
                                    }
                                  }}
                                  variant="danger"
                                >
                                  Delete
                                </Button>
                              </div>
                            </Modal.Footer>
                          </Modal.Content>
                        </Modal>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  )
}

export default StudentList
