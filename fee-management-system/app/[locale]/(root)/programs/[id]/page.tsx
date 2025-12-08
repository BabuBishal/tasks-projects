'use client'

import { useState, use } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { Plus } from 'lucide-react'
import { useToast } from '@/shared/ui/toast'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import {
  useGetFeeStructuresQuery,
  useDeleteFeeStructureMutation,
} from '@/app/[locale]/(root)/_hooks/fees'
import { useGetProgramQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { ProgramDetailsSkeleton } from './_components/ProgramDetailsSkeleton'
import { FeeStructureResponse } from '@/lib/types/api'
import FeeStructureList from '../_components/fees/FeeStructureList'
import FeeDetailsModal from '../_components/fees/FeeDetailsModal'
import { ViewTransition } from 'react'
import FeeStructureModal from './_components/FeeStructureModal'

export interface FeeStructure {
  id: string
  programSemester: {
    programId: string
    semesterNo: number
    program: {
      name: string
    }
  }
  tuitionFee: number
  labFee: number
  libraryFee: number
  sportsFee: number
  miscFee: number
  totalFee: number
}

export default function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { notify } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFee, setEditingFee] = useState<Partial<FeeStructureResponse> | null>(null)
  const [selectedFee, setSelectedFee] = useState<FeeStructureResponse | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { data: program, isLoading } = useGetProgramQuery(id)
  const { data: allFeeStructures, isLoading: isFeesLoading } = useGetFeeStructuresQuery()

  const feeStructures = allFeeStructures?.filter(
    (fee: FeeStructureResponse) => fee.programSemester.programId === id
  )

  const deleteFeeStructure = useDeleteFeeStructureMutation()

  const handleDelete = async (id: string) => {
    deleteFeeStructure.mutate(id, {
      onSuccess: () => {
        notify({
          title: 'Success',
          description: 'Fee structure deleted successfully',
          type: 'success',
        })
        setIsDetailsOpen(false)
        setEditingFee(null)
      },
      onError: (error: Error) => {
        notify({
          title: 'Error',
          description: error.message || 'Failed to delete fee structure',
          type: 'error',
        })
      },
    })
  }

  const openCreateModal = () => {
    setEditingFee(null)
    setIsModalOpen(true)
  }

  const openEditModal = (fee: FeeStructureResponse) => {
    setEditingFee(fee)
    setIsModalOpen(true)
  }

  const handleSelectFee = (fee: FeeStructureResponse) => {
    setSelectedFee(fee)
    setIsDetailsOpen(true)
  }

  if (isLoading) {
    return <ProgramDetailsSkeleton />
  }

  if (!program) {
    return <div>Program not found</div>
  }

  return (
    <ViewTransition>
      <div className="flex h-full w-full flex-col gap-6">
        <Breadcrumb
          items={[
            { label: 'Programs', href: '/programs' },
            { label: program.name, href: `/programs/${program.id}` },
          ]}
        />
        <div className="flex items-end justify-between gap-5">
          <div>
            <h1 className="text-foreground text-2xl font-bold">{program.name}</h1>
            <p className="text-muted-foreground">
              {program.duration} Semesters • Manage Fee Structures
            </p>
          </div>
          <Button variant="primary" onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Fee Structure
          </Button>
        </div>

        {isFeesLoading ? (
          <div className="flex justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          </div>
        ) : (
          <FeeStructureList feeStructures={feeStructures || []} onSelect={handleSelectFee} />
        )}

        <FeeStructureModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingFee={editingFee}
          setEditingFee={setEditingFee}
          program={program}
        />

        <FeeDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          feeStructure={selectedFee}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>
    </ViewTransition>
  )
}
