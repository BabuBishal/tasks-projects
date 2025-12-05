'use client'

import { Modal } from '@/shared/ui/modal'
import { X } from 'lucide-react'
import Form from '@rjsf/core'
import validator from '@/shared/forms/rjsf/validators/validator'
import SelectWidget from '@/shared/forms/rjsf/widgets/select-widget/SelectWidget'
import TextWidget from '@/shared/forms/rjsf/widgets/text-widget/TextWidget'
import '@/shared/forms/rjsf/styles/rjsf.scss'
import { FeeStructureResponse } from '@/lib/types/api'
import { FeeStructureFormValues } from '../../_components/fees/FeeStructureForm'
import feeSchema from '../../_schema/fee.schema'
import { feeUiSchema } from '../../_schema/ui.schema'
import { Button } from '@/shared/ui/button/Button'
import { Dispatch, SetStateAction } from 'react'
import { useCreateFeeStructureMutation, useUpdateFeeStructureMutation } from '../../../_hooks/fees'
import { useToast } from '@/shared/ui/toast'
import { Program } from '@/lib/types'
import '@/shared/forms/rjsf/styles/rjsf.scss'

const FeeStructureModal = ({
  isModalOpen,
  setIsModalOpen,
  editingFee,
  setEditingFee,
  program,
}: {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  editingFee: Partial<FeeStructureResponse> | null
  setEditingFee: Dispatch<SetStateAction<Partial<FeeStructureResponse> | null>>
  program: Program
}) => {
  const createFeeStructure = useCreateFeeStructureMutation()
  const updateFeeStructure = useUpdateFeeStructureMutation()
  const { notify } = useToast()

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

  return (
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
              <Form
                schema={feeSchema}
                validator={validator}
                uiSchema={feeUiSchema}
                formData={
                  editingFee
                    ? {
                        fee: {
                          program: program.name,
                          semester: editingFee.programSemester?.semesterNo?.toString() || '',
                          tuitionFee: editingFee.tuitionFee || 0,
                          labFee: editingFee.labFee || 0,
                          libraryFee: editingFee.libraryFee || 0,
                          sportsFee: editingFee.sportsFee || 0,
                          miscFee: editingFee.miscFee || 0,
                        },
                      }
                    : {
                        fee: {
                          program: program.name,
                          semester: '',
                          tuitionFee: 0,
                          labFee: 0,
                          libraryFee: 0,
                          sportsFee: 0,
                          miscFee: 0,
                        },
                      }
                }
                onSubmit={({ formData }) => {
                  const feeData: FeeStructureFormValues = {
                    programId: program.id,
                    semesterNo: formData.fee.semester,
                    tuitionFee: formData.fee.tuitionFee,
                    labFee: formData.fee.labFee,
                    libraryFee: formData.fee.libraryFee,
                    sportsFee: formData.fee.sportsFee,
                    miscFee: formData.fee.miscFee,
                  }
                  if (editingFee) {
                    handleUpdate(feeData)
                  } else {
                    handleCreate(feeData)
                  }
                }}
                showErrorList={false}
                widgets={{
                  number: TextWidget,
                  text: TextWidget,
                  select: SelectWidget,
                }}
              >
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingFee(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={createFeeStructure.isPending || updateFeeStructure.isPending}
                  >
                    {createFeeStructure.isPending || updateFeeStructure.isPending
                      ? 'Saving...'
                      : editingFee
                        ? 'Update'
                        : 'Create'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default FeeStructureModal
