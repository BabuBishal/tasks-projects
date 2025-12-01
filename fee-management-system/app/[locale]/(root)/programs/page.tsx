'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/Button'
import { Plus } from 'lucide-react'
import ProgramList from '@/app/[locale]/(root)/programs/_components/ProgramList'

import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import { useToast } from '@/components/ui/toast'
import {
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useGetProgramsQuery,
  useUpdateProgramMutation,
} from '@/hooks/query-hooks/programs'
import AddProgramModal from './_components/AddProgramModal'
import { ProgramListSkeleton } from './_components/skeletons/ProgramListSkeleton'

export interface Program {
  id: string
  name: string
  duration: number
  _count?: {
    students: number
  }
}

export default function ProgramsPage() {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: programs, isLoading } = useGetProgramsQuery()
  const createProgramMutation = useCreateProgramMutation()
  const updateProgramMutation = useUpdateProgramMutation()
  const deleteProgramMutation = useDeleteProgramMutation()

  const { notify } = useToast()

  const openCreateModal = () => {
    setEditingProgram(null)
    setIsModalOpen(true)
  }

  const openEditModal = (program: Program) => {
    setEditingProgram(program)
    setIsModalOpen(true)
  }

  const handleCreate = async (data: { name: string; duration: number }) => {
    try {
      await createProgramMutation.mutateAsync(data)

      notify({
        title: 'Success',
        description: 'Program created successfully',
        type: 'success',
      })
      setIsModalOpen(false)
    } catch (error: unknown) {
      notify({
        title: 'Error',
        description: (error as Error).message || 'Failed to create program',
        type: 'error',
      })
    }
  }

  const handleUpdate = async (data: { name: string; duration: number }) => {
    if (!editingProgram) return

    try {
      await updateProgramMutation.mutateAsync({
        id: editingProgram.id,
        data,
      })

      notify({
        title: 'Success',
        description: 'Program updated successfully',
        type: 'success',
      })

      setIsModalOpen(false)
      setEditingProgram(null)
    } catch (error: unknown) {
      notify({
        title: 'Error',
        description: (error as Error).message || 'Failed to update program',
        type: 'error',
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProgramMutation.mutateAsync(id)

      notify({
        title: 'Success',
        description: 'Program deleted successfully',
        type: 'success',
      })
    } catch (error: unknown) {
      notify({
        title: 'Error',
        description: (error as Error).message || 'Failed to delete program',
        type: 'error',
      })
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Programs', href: '/programs' }]} />
      <div className="flex items-end justify-between gap-5">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Manage academic programs and their durations</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      {isLoading ? (
        <ProgramListSkeleton />
      ) : (
        <ProgramList programs={programs || []} onEdit={openEditModal} onDelete={handleDelete} />
      )}
      <AddProgramModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingProgram={editingProgram}
        handleUpdate={handleUpdate}
        handleCreate={handleCreate}
      />
    </div>
  )
}
