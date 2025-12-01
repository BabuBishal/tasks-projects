'use client'

import { useState, use } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { Plus, X } from 'lucide-react'

import { Modal } from '@/shared/ui/modal/Modal'
import { useToast } from '@/shared/ui/toast'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import {
  useGetFeeStructuresQuery,
  useCreateFeeStructureMutation,
  useUpdateFeeStructureMutation,
  useDeleteFeeStructureMutation,
} from '@/app/[locale]/(root)/_hooks/fees'
import { useGetProgramQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { ProgramDetailsSkeleton } from './_components/ProgramDetailsSkeleton'
import { FeeStructureResponse } from '@/lib/types/api'
import FeeStructureList from '../_components/fees/FeeStructureList'
import FeeStructureForm, { FeeStructureFormValues } from '../_components/fees/FeeStructureForm'
import FeeDetailsModal from '../_components/fees/FeeDetailsModal'

// interface Program {
//   id: string;
//   name: string;
//   duration: number;
//   semesters: {
//     id: string;
//     semesterNo: number;
//     feeStructures: any[];
//   }[];
// }

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

  // Filter fee structures for this program
  const feeStructures = allFeeStructures?.filter(
    (fee: FeeStructureResponse) => fee.programSemester.programId === id
  )

  // Mutations
  const createFeeStructure = useCreateFeeStructureMutation()
  const updateFeeStructure = useUpdateFeeStructureMutation()
  const deleteFeeStructure = useDeleteFeeStructureMutation()

  const handleCreate = async (formData: FeeStructureFormValues) => {
    const data = {
      programId: formData.programId,
      semesterNo: formData.semesterNo,
      tuitionFee: formData.tuitionFee,
      labFee: formData.labFee,
      libraryFee: formData.libraryFee,
      sportsFee: formData.sportsFee,
      miscFee: formData.miscFee,
    }

    createFeeStructure.mutate(data, {
      onSuccess: () => {
        notify({
          title: 'Success',
          description: 'Fee structure created successfully',
          type: 'success',
        })
        setIsModalOpen(false)
      },
      onError: (error: Error) => {
        notify({
          title: 'Error',
          description: error.message || 'Failed to create fee structure',
          type: 'error',
        })
      },
    })
  }

  const handleUpdate = async (formData: FeeStructureFormValues) => {
    if (!editingFee) return

    const data = {
      programId: formData.programId,
      semesterNo: formData.semesterNo,
      tuitionFee: formData.tuitionFee,
      labFee: formData.labFee,
      libraryFee: formData.libraryFee,
      sportsFee: formData.sportsFee,
      miscFee: formData.miscFee,
    }

    updateFeeStructure.mutate(
      { id: editingFee.id!, data },
      {
        onSuccess: () => {
          notify({
            title: 'Success',
            description: 'Fee structure updated successfully',
            type: 'success',
          })
          setIsModalOpen(false)
          setEditingFee(null)
        },
        onError: (error: Error) => {
          notify({
            title: 'Error',
            description: error.message || 'Failed to update fee structure',
            type: 'error',
          })
        },
      }
    )
  }

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

  // ...

  return (
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

      {/* Create/Edit Modal */}
      <Modal defaultOpen={isModalOpen}>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-background max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg shadow-lg">
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-lg font-bold">
                  {editingFee ? 'Edit Fee Structure' : 'Add Fee Structure'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <FeeStructureForm
                  key={editingFee ? editingFee.id : 'new'}
                  initialData={
                    editingFee
                      ? {
                          programSemester: {
                            programId: editingFee?.programSemester?.programId,
                            semesterNo: editingFee?.programSemester?.semesterNo,
                          },
                          tuitionFee: editingFee?.tuitionFee,
                          labFee: editingFee?.labFee,
                          libraryFee: editingFee?.libraryFee,
                          sportsFee: editingFee?.sportsFee,
                          miscFee: editingFee.miscFee,
                        }
                      : {
                          programSemester: {
                            programId: program.id,
                            semesterNo: 1,
                          },
                        }
                  }
                  program={program}
                  onSubmit={editingFee ? handleUpdate : handleCreate}
                  onCancel={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Details Modal */}
      <FeeDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        feeStructure={selectedFee}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
    </div>
  )
}
