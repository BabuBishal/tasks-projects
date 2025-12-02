'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { useToast } from '@/shared/ui/toast/Toast'
import { useUpdateStudentMutation } from '@/app/[locale]/(root)/students/_hooks'
import { StudentResponse } from '@/lib/types/api'
import { useGetProgramsQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { Pencil } from 'lucide-react'

interface EditStudentModalProps {
  student: StudentResponse
}

export default function EditStudentModal({ student }: EditStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    programId: student.programId,
    semester: student.semester,
    phone: student.phone,
    address: student.address,
    graduated: student.status === 'Graduated',
  })

  const { notify } = useToast()
  const updateStudentMutation = useUpdateStudentMutation()
  const { data: programs } = useGetProgramsQuery()

  useEffect(() => {
    setFormData({
      name: student.name,
      email: student.email,
      programId: student.programId,
      semester: student.semester,
      phone: student.phone,
      address: student.address,
      graduated: student.status === 'Graduated',
    })
  }, [student])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    notify({
      title: 'Processing',
      description: 'Updating student information...',
      type: 'info',
    })

    try {
      await updateStudentMutation.mutateAsync({
        id: student.id,
        data: {
          ...formData,
          status: formData.graduated ? 'Graduated' : 'Active',
        },
      })

      notify({
        title: 'Success',
        description: 'Student updated successfully',
        type: 'success',
      })
      // onClose() // This will be handled by the Modal.Close component
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update student',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Program</label>
              <select
                value={formData.programId}
                onChange={e => setFormData({ ...formData, programId: e.target.value })}
                className="w-full rounded-md border px-3 py-2"
                required
              >
                {programs?.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Semester</label>
              <input
                type="number"
                value={formData.semester}
                onChange={e => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                className="w-full rounded-md border px-3 py-2"
                min="1"
                max="8"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.graduated}
                onChange={e => setFormData({ ...formData, graduated: e.target.checked })}
                id="graduated"
              />
              <label htmlFor="graduated" className="text-sm font-medium">
                Graduated
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Modal.Close>Cancel</Modal.Close>
            <Button onClick={handleSubmit} disabled={isLoading} variant="primary">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
