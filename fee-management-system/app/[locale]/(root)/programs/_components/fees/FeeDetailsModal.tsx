'use client'

import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { Edit, Trash2, X } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/utils'
// import { FeeStructureFormInputs } from '@/lib/types'
import { FeeStructureResponse } from '@/lib/types/api'
import { ViewTransition } from 'react'

interface FeeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  feeStructure: FeeStructureResponse | null
  onEdit: (fee: FeeStructureResponse) => void
  onDelete: (id: string) => void
}

export default function FeeDetailsModal({
  isOpen,
  onClose,
  feeStructure,
  onEdit,
  onDelete,
}: FeeDetailsModalProps) {
  if (!feeStructure) return null

  return (
    <ViewTransition>
      <Modal defaultOpen={isOpen}>
        {isOpen && feeStructure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-background w-full max-w-md overflow-hidden rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-6">
                <div>
                  <h2 className="text-lg font-bold">Fee Structure Details</h2>
                  <p className="text-muted-foreground text-sm">
                    {feeStructure?.programSemester?.program?.name} - Semester{' '}
                    {feeStructure?.programSemester?.semesterNo}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-3 p-6">
                <FeeRow label="Tuition Fee" amount={feeStructure?.tuitionFee} />
                <FeeRow label="Lab Fee" amount={feeStructure?.labFee} />
                <FeeRow label="Library Fee" amount={feeStructure?.libraryFee} />
                <FeeRow label="Sports Fee" amount={feeStructure?.sportsFee} />
                <FeeRow label="Miscellaneous Fee" amount={feeStructure?.miscFee} />

                {/* Total */}
                <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                  <span className="text-foreground text-lg font-bold">Total Fee</span>
                  <span className="text-primary text-2xl font-bold">
                    {formatCurrency(feeStructure?.totalFee)}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-border flex justify-end gap-3 border-t p-6 pt-4">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this fee structure? This action cannot be undone.'
                      )
                    ) {
                      onDelete(feeStructure?.id)
                      onClose()
                    }
                  }}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onEdit(feeStructure)
                    onClose()
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </ViewTransition>
  )
}

const FeeRow = ({ label, amount }: { label: string; amount: number }) => (
  <div className="border-border flex items-center justify-between border-b py-2.5 last:border-0">
    <span className="text-muted-foreground text-sm">{label}</span>
    <span className="text-foreground font-semibold">{formatCurrency(amount)}</span>
  </div>
)
