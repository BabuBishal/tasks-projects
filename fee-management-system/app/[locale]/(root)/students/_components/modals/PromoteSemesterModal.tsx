'use client'

import { useState } from 'react'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { useToast } from '@/shared/ui/toast/Toast'
import { usePromoteSemesterMutation } from '@/app/[locale]/(root)/students/_hooks'

interface PromoteSemesterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedStudentIds: string[]
  onSuccess: () => void
}

export default function PromoteSemesterModal({
  isOpen,
  onClose,
  selectedStudentIds,
  onSuccess,
}: PromoteSemesterModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { notify } = useToast()
  const promoteMutation = usePromoteSemesterMutation()

  const handlePromote = async () => {
    setIsLoading(true)
    try {
      await promoteMutation.mutateAsync(selectedStudentIds)
      notify({
        title: 'Success',
        description: `${selectedStudentIds.length} students promoted successfully`,
        type: 'success',
      })
      onSuccess()
      onClose()
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to promote students',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={open => !open && onClose()}>
      <Modal.Content>
        <Modal.CloseIcon />
        <Modal.Header>
          <h2 className="text-xl font-bold">Promote Students</h2>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure you want to promote <strong>{selectedStudentIds.length} students</strong>{' '}
            to the next semester?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Modal.Close>Cancel</Modal.Close>
            <Button onClick={handlePromote} disabled={isLoading} variant="primary">
              {isLoading ? 'Promoting...' : `Promote ${selectedStudentIds.length} Students`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
