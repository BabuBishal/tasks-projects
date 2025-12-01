'use client'
import { PaymentFormProps } from '@/lib/types'
import { paymentMethod } from '@/lib/constants/constants'
import { useState } from 'react'
import { Button } from '../ui/button/Button'
import { StudentType } from '@/app/[locale]/(root)/payments/add/page'

export default function PaymentForm({
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
  students,
  setAmount,
  loading,
}: PaymentFormProps & {
  error: string
  students: StudentType[]
  setAmount?: (v: number) => void
  loading: boolean
}) {
  const [selectedFeeIds, setSelectedFeeIds] = useState<Set<string>>(new Set())

  const selectedStudent =
    formData.id && students.length > 0
      ? students.find(s => String(s.id) === formData.id) || null
      : null

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    handleChange({
      target: {
        name: 'id',
        value: id,
      },
    } as React.ChangeEvent<HTMLInputElement>)
    setSelectedFeeIds(new Set())
    setAmount?.(0)
  }

  const handleToggleFee = (feeId: string) => {
    const newSelected = new Set(selectedFeeIds)
    if (newSelected.has(feeId)) {
      newSelected.delete(feeId)
    } else {
      newSelected.add(feeId)
    }
    setSelectedFeeIds(newSelected)

    // Calculate total amount from selected fees
    if (selectedStudent) {
      const total = Array.from(newSelected).reduce((sum, id) => {
        const fee = selectedStudent.feesList?.find(f => f.id === id)
        return sum + (fee?.balance ?? 0)
      }, 0)
      setAmount?.(total)

      // Pass selected fee IDs to parent
      handleChange({
        target: {
          name: 'selectedFeeIds',
          value: Array.from(newSelected).join(','),
        },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleSelectAll = () => {
    if (!selectedStudent?.feesList) return

    const unpaidFees = selectedStudent.feesList.filter(f => f.balance > 0).map(f => f.id)

    setSelectedFeeIds(new Set(unpaidFees))

    const total = unpaidFees.reduce((sum, id) => {
      const fee = selectedStudent.feesList?.find(f => f.id === id)
      return sum + (fee?.balance ?? 0)
    }, 0)
    setAmount?.(total)
  }

  const handleClearSelection = () => {
    setSelectedFeeIds(new Set())
    setAmount?.(0)
  }

  return (
    <div className="bg-background border-border mx-auto w-full max-w-4xl rounded-lg border shadow-lg">
      <div className="bg-secondary text-background rounded-t-lg px-6 py-4">
        <h2 className="text-2xl font-bold">Fee Payment</h2>
        <p className="mt-1 text-sm text-zinc-100 dark:text-zinc-900">
          Select student and semesters to pay
        </p>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <label className="text-secondary mb-2 block text-sm font-semibold">Select Student</label>
          <select
            className="border-border bg-accent w-full rounded-lg border-2 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.id}
            name="id"
            onChange={e => {
              handleChange(e)
              handleStudentChange(e)
            }}
          >
            <option value="" disabled>
              Choose a student...
            </option>
            {students?.map((option: StudentType) => (
              <option key={option.id} value={option.id}>
                {option.rollNo} - {option.name}
              </option>
            ))}
          </select>
          {formErrors.id && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <span>⚠</span> {formErrors.id}
            </p>
          )}
        </div>

        {selectedStudent && (
          <div className="bg-accent border-border rounded-lg border-2 p-5">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div>
                <p className="text-muted text-xs font-medium uppercase">Program</p>
                <p className="text-secondary text-lg font-bold">
                  {selectedStudent.program || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs font-medium uppercase">Current Semester</p>
                <p className="text-secondary text-lg font-bold">
                  Semester {selectedStudent.semester}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs font-medium uppercase">Roll Number</p>
                <p className="text-secondary text-lg font-bold">{selectedStudent.rollNo}</p>
              </div>
              <div>
                <p className="text-muted text-xs font-medium uppercase">Total Paid</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  Rs.{' '}
                  {Array.isArray(selectedStudent.fees)
                    ? '0'
                    : selectedStudent.fees?.paid?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs font-medium uppercase">Current Balance</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  Rs.{' '}
                  {Array.isArray(selectedStudent.fees)
                    ? '0'
                    : selectedStudent.fees?.balance?.toLocaleString() || '0'}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs font-medium uppercase">Total Outstanding</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  Rs.{' '}
                  {Array.isArray(selectedStudent.fees)
                    ? '0'
                    : selectedStudent.fees?.totalOutstandingAll?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedStudent && selectedStudent.feesList && selectedStudent.feesList.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-secondary text-lg font-semibold">Select Semesters to Pay</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-400"
                >
                  Select All Unpaid
                </button>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="bg-accent text-priimary hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            <div className="border-border overflow-hidden rounded-lg border-2">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-accent border-border border-b-2">
                    <tr>
                      <th className="text-secondary px-4 py-3 text-left font-semibold">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={
                            selectedStudent.feesList.filter(f => f.balance > 0).length > 0 &&
                            selectedStudent.feesList
                              .filter(f => f.balance > 0)
                              .every(f => selectedFeeIds.has(f.id))
                          }
                          onChange={e => {
                            if (e.target.checked) {
                              handleSelectAll()
                            } else {
                              handleClearSelection()
                            }
                          }}
                        />
                      </th>
                      <th className="text-secondary px-4 py-3 text-left font-semibold">
                        Academic Year
                      </th>
                      <th className="text-secondary px-4 py-3 text-left font-semibold">Semester</th>
                      <th className="text-secondary px-4 py-3 text-right font-semibold">
                        Original Fee
                      </th>
                      <th className="text-secondary px-4 py-3 text-right font-semibold">
                        Discount
                      </th>
                      <th className="text-secondary px-4 py-3 text-right font-semibold">Payable</th>
                      <th className="text-secondary px-4 py-3 text-right font-semibold">Paid</th>
                      <th className="text-secondary px-4 py-3 text-right font-semibold">Balance</th>
                      <th className="text-secondary px-4 py-3 text-left font-semibold">Status</th>
                      <th className="text-secondary px-4 py-3 text-left font-semibold">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {selectedStudent.feesList.map(f => {
                      const isSelected = selectedFeeIds.has(f.id)
                      const isPaid = f.balance <= 0

                      return (
                        <tr
                          key={f.id}
                          className={` ${
                            isSelected
                              ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950'
                              : ''
                          } ${
                            isPaid
                              ? 'bg-green-50 opacity-60 dark:bg-green-950'
                              : 'hover:bg-gray-50 dark:hover:bg-zinc-800'
                          } cursor-pointer transition-colors`}
                          onClick={() => !isPaid && handleToggleFee(f.id)}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 cursor-pointer"
                              checked={isSelected}
                              onChange={() => handleToggleFee(f.id)}
                              disabled={isPaid}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium">{f.academicYear}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              Sem {f.semesterNo}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600">
                            Rs. {f.originalFee.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-green-600">
                            - Rs. {f.discount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold">
                            Rs. {f.payableFee.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right text-green-600">
                            Rs. {f.paid.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`font-bold ${
                                f.balance > 0 ? 'text-red-600' : 'text-green-600'
                              }`}
                            >
                              Rs. {f.balance.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                f.status === 'Paid' ? 'bg-green-100 text-green-800' : ''
                              } ${f.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''} ${
                                f.status === 'Overdue' ? 'bg-red-100 text-red-800' : ''
                              } ${f.status === 'Partial' ? 'bg-blue-100 text-blue-800' : ''} `}
                            >
                              {f.status}
                            </span>
                          </td>
                          <td className="text-secondary px-4 py-3 text-sm">
                            {f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedFeeIds.size > 0 && (
              <div className="mt-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {selectedFeeIds.size} semester
                      {selectedFeeIds.size > 1 ? 's' : ''} selected
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {Array.from(selectedFeeIds)
                        .map(id => {
                          const fee = selectedStudent.feesList?.find(f => f.id === id)
                          return fee ? `Sem ${fee.semesterNo} (${fee.academicYear})` : ''
                        })
                        .join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-600">
                      Rs. {formData.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="text-secondary mb-2 block text-sm font-semibold">Payment Method</label>
          <select
            className="border-border bg-accent w-full rounded-lg border-2 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.method}
            name="method"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select payment method...
            </option>
            {paymentMethod?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formErrors.method && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
              <span>⚠</span> {formErrors.method}
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-red-600">
              <span className="text-xl">❌</span> {error}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={
              !selectedStudent || selectedFeeIds.size === 0 || formData.amount <= 0 || loading
            }
            onClick={handleSubmit}
          >
            Process Payment - Rs. {formData.amount.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  )
}
