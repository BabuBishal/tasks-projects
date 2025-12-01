'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { useToast } from '@/components/ui/toast'
import { useDeleteStudentMutation } from '@/app/[locale]/(root)/students/_hooks'
import { StudentResponse } from '@/lib/types/api'

interface DeleteStudentModalProps {
  isOpen: boolean
  onClose: () => void
  student: StudentResponse | null
}

export default function DeleteStudentModal({ isOpen, onClose, student }: DeleteStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { notify } = useToast()
  const deleteStudentMutation = useDeleteStudentMutation()

  const handleDelete = async () => {
    if (!student) return

    setIsLoading(true)
    try {
      await deleteStudentMutation.mutateAsync(student.id)
      notify({
        title: 'Success',
        description: 'Student deleted successfully',
        type: 'success',
      })
      onClose()
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete student',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!student) return null

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.CloseIcon />
        <Modal.Header>
          <h2 className="text-xl font-bold text-red-600">Delete Student</h2>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure you want to delete <strong>{student.name}</strong>? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Modal.Close>Cancel</Modal.Close>
            <Button onClick={handleDelete} disabled={isLoading} variant="danger">
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
