'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { useToast } from '@/components/ui/toast'
import { useBulkDeleteStudentsMutation } from '@/app/[locale]/(root)/students/_hooks'

interface BulkDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  selectedStudentIds: string[]
  onSuccess: () => void
}

export default function BulkDeleteModal({
  isOpen,
  onClose,
  selectedStudentIds,
  onSuccess,
}: BulkDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { notify } = useToast()
  const bulkDeleteMutation = useBulkDeleteStudentsMutation()

  const handleBulkDelete = async () => {
    setIsLoading(true)
    try {
      await bulkDeleteMutation.mutateAsync(selectedStudentIds)
      notify({
        title: 'Success',
        description: `${selectedStudentIds.length} students deleted successfully`,
        type: 'success',
      })
      onSuccess()
      onClose()
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete students',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.CloseIcon />
        <Modal.Header>
          <h2 className="text-xl font-bold text-red-600">Delete Multiple Students</h2>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure you want to delete <strong>{selectedStudentIds.length} students</strong>?
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Modal.Close>Cancel</Modal.Close>
            <Button onClick={handleBulkDelete} disabled={isLoading} variant="danger">
              {isLoading ? 'Deleting...' : `Delete ${selectedStudentIds.length} Students`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
