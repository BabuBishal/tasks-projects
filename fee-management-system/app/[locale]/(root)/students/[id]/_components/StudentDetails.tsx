'use client'
import { useRouter } from 'next/navigation'
import { useMemo, useCallback } from 'react'
import { Pencil, Trash2, CreditCard, Award, ArrowRight, Download } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils/utils'

import { Button } from '@/shared/ui/button/Button'
import StatsCard from '@/shared/ui/stats-card/StatsCard'
import StudentInfo from '../../_components/StudentInfo'
import Badge from '@/shared/ui/badges/Badges'
import { Modal } from '@/shared/ui/modal/Modal'
import { useToast } from '@/shared/ui/toast'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import { StudentDetailsSkeleton } from './StudentDetailsSkeleton'
import {
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
  usePromoteSemesterMutation,
} from '@/app/[locale]/(root)/students/_hooks'
import { handleDownloadFeeRecord } from '@/lib/utils/fee-records-download'
import { usePermission } from '@/hooks/usePermission'

interface StudentDetailsProps {
  id: string
}

export default function StudentDetails({ id }: StudentDetailsProps) {
  const router = useRouter()
  const { notify } = useToast()

  const { mutateAsync: deleteStudent, isPending: deleteLoading } = useDeleteStudentMutation()
  const { mutateAsync: promoteMutation, isPending: promoteLoading } = usePromoteSemesterMutation()
  const { data: student, isLoading, error } = useGetStudentByIdQuery(id)

  const canUserDelete = usePermission('delete', 'students')
  const handleDelete = useCallback(async () => {
    try {
      await deleteStudent(id)
      notify({ description: 'Student deleted successfully', type: 'success' })
      router.push('/students')
    } catch (err) {
      notify({
        description: err instanceof Error ? err.message : 'Failed to delete student',
        type: 'error',
      })
      router.push(`/students/${id}`)
    }
  }, [deleteStudent, id, notify, router])

  const handlePromote = useCallback(async () => {
    if (!student) return
    try {
      const { results } = await promoteMutation([student.id])
      if (results.success.length > 0 && results.failed.length === 0) {
        notify({
          description: 'Student promoted successfully!',
          type: 'success',
        })
      }
      if (results.failed.length > 0 && results.success.length > 0) {
        notify({
          description: `${results.failed.length} students failed to promote.`,
          type: 'error',
        })
        notify({
          description: `${results.success.length} students promoted successfully.`,
          type: 'success',
        })
      }

      if (results.failed.length > 0 && results.success.length === 0) {
        notify({
          description: `${results.failed.length} students failed to promote.`,
          type: 'error',
        })
      }
    } catch (err) {
      notify({
        description: err instanceof Error ? err.message : 'Failed to promote student',
        type: 'error',
      })
    }
  }, [student, promoteMutation, notify])

  const financialSummary = useMemo(
    () => ({
      totalPaid: student?.totalPaid || 0,
      totalDue: student?.totalBalance || 0,
      totalScholarships: student?.totalScholarshipAmount || 0,
      totalPayable: student?.totalPayableFee || 0,
    }),
    [student]
  )

  const downloadFeeRecords = useCallback(() => {
    if (!student) return
    handleDownloadFeeRecord({
      student,
      totalDue: financialSummary.totalDue,
      totalPaid: financialSummary.totalPaid,
      totalScholarships: financialSummary.totalScholarships,
      totalPayable: financialSummary.totalPayable,
    })
  }, [student, financialSummary])

  if (isLoading) {
    return <StudentDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-red-600">{error.message || 'Student not found'}</p>
        <Button
          onClick={() => router.back()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back to Students
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb
        items={[
          { label: 'Students', href: '/students' },
          {
            label: student?.name || 'Student',
            href: `/students/${student?.id}`,
          },
        ]}
      />
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-foreground text-2xl font-bold">{student?.name}</h1>
          <p className="text-muted-foreground">Roll No: {student?.rollNo}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={handlePromote}
            disabled={promoteLoading || student?.status === 'Graduated'}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <ArrowRight className="h-4 w-4" />
            {promoteLoading ? 'Promoting...' : 'Promote'}
          </Button>

          <Button
            variant="primary"
            disabled={student?.status === 'Graduated'}
            onClick={() => router.push(`/students/${student?.id}/edit`)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          {canUserDelete && (
            <Modal>
              <Modal.Trigger className="flex items-center justify-center gap-2 rounded-sm bg-red-600! p-2 text-white! transition-all hover:-translate-y-px hover:bg-red-500 dark:bg-red-400">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </Modal.Trigger>
              <Modal.Content>
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this student? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Close className="w-fit! hover:-translate-y-px">Cancel</Modal.Close>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={handleDelete}
                    disabled={deleteLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleteLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={'Total Payable'}
          value={formatCurrency(financialSummary.totalPayable)}
          description={`After ${formatCurrency(student?.totalDiscount || 0)} discount`}
          icon={CreditCard}
          variant="primary"
        />
        <StatsCard
          title={'Total Paid'}
          value={formatCurrency(financialSummary.totalPaid)}
          icon={CreditCard}
          variant="success"
        />
        <StatsCard
          title={'Balance Due'}
          value={formatCurrency(financialSummary.totalDue)}
          icon={CreditCard}
          variant="danger"
        />
        <StatsCard
          title={'Scholarship'}
          value={formatCurrency(financialSummary.totalScholarships)}
          icon={Award}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Student Information */}
        {student && <StudentInfo student={student} />}

        {/* Fees & Payments */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-primary text-xl font-bold">Fee Records</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadFeeRecords}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            {student && Array.isArray(student.fees) && student.fees.length === 0 ? (
              <p className="text-muted py-8 text-center">No fee records found</p>
            ) : (
              <div className="max-h-[50vh] space-y-5 overflow-y-auto">
                {student &&
                  Array.isArray(student.fees) &&
                  student.fees.map(fee => {
                    return (
                      <div
                        key={fee.id}
                        className="border-border rounded-lg border p-4 shadow transition-shadow hover:shadow-md"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-primary font-semibold">Semester Fee</h3>
                            <p className="text-muted text-sm">
                              {fee.academicYear} • Due: {formatDate(fee.dueDate)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              fee.status.toLowerCase() === 'paid'
                                ? 'success'
                                : fee.status.toLowerCase() === 'pending'
                                  ? 'warning'
                                  : 'danger'
                            }
                          >
                            {fee.status.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Fee Structure Breakdown */}
                        <div className="mb-4 rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                          <h4 className="text-secondary mb-2 text-sm font-semibold">
                            Fee Structure
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Tuition:</span>
                              <span className="font-medium">
                                {fee.feeStructure.tuitionFee &&
                                  formatCurrency(fee.feeStructure.tuitionFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Lab:</span>
                              <span className="font-medium">
                                {fee.feeStructure.labFee && formatCurrency(fee.feeStructure.labFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Library:</span>
                              <span className="font-medium">
                                {fee.feeStructure.libraryFee &&
                                  formatCurrency(fee.feeStructure.libraryFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Sports:</span>
                              <span className="font-medium">
                                {fee.feeStructure.sportsFee &&
                                  formatCurrency(fee.feeStructure.sportsFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Misc:</span>
                              <span className="font-medium">
                                {fee.feeStructure.miscFee &&
                                  formatCurrency(fee.feeStructure.miscFee)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="mb-3 grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-muted text-xs">Original Fee</p>
                            <p className="text-primary font-semibold">
                              {formatCurrency(fee.originalFee)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted text-xs">Payable</p>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              {formatCurrency(fee.payableFee)}
                            </p>
                            {fee.discount > 0 && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                -{formatCurrency(fee.discount)}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Paid</p>
                            <p className="font-semibold text-green-600 dark:text-green-400">
                              {formatCurrency(fee.paid)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Balance</p>
                            <p className="font-semibold text-red-600 dark:text-red-400">
                              {formatCurrency(fee.balance)}
                            </p>
                          </div>
                        </div>

                        {/* Payment History */}
                        {(fee.payments || []).length > 0 && (
                          <div className="border-border mt-4 border-t pt-4">
                            <h4 className="text-secondary mb-2 text-sm font-semibold">
                              Payment History
                            </h4>
                            <div className="space-y-2">
                              {(fee.payments || []).map(payment => (
                                <div
                                  key={payment.id}
                                  className="flex items-center justify-between rounded bg-zinc-100 p-3 text-sm dark:bg-zinc-800"
                                >
                                  <div>
                                    <p className="text-primary font-medium">
                                      {formatCurrency(payment.amount)}
                                    </p>
                                    <p className="text-muted text-xs">
                                      {formatDate(payment.date)} • {payment.method}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    {payment.receiptNo && (
                                      <p className="text-muted mt-1 text-sm">
                                        Receipt: {payment.receiptNo}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Make Payment Button - Show only if there's a balance */}
                        {fee.balance > 0 && (
                          <div className="border-border mt-4 border-t pt-4">
                            <Button
                              variant="primary"
                              size="sm"
                              className="flex w-full items-center justify-center gap-2"
                              onClick={() => router.push(`/payments/add?studentId=${student.id}`)}
                            >
                              <CreditCard className="h-4 w-4" />
                              Make Payment
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
