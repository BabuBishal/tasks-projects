import { Modal } from '@/shared/ui/modal/Modal'

import { Program } from '../page'
// import ProgramForm from '@/app/[locale]/(root)/programs/_components/ProgramForm'
import { X } from 'lucide-react'
import Form from '@rjsf/core'
import programSchema from '../_schema/program.schema'
import validator from '@/shared/forms/rjsf/validators/validator'
import { programUiSchema } from '../_schema/ui.schema'
import TextWidget from '@/shared/forms/rjsf/widgets/text-widget/TextWidget'
import '@/shared/forms/rjsf/styles/rjsf.scss'
import { Button } from '@/shared/ui/button/Button'
import { useCreateProgramMutation, useUpdateProgramMutation } from '../_hooks'
import { useToast } from '@/shared/ui/toast'
import { SetStateAction } from 'react'

const AddProgramModal = ({
  isModalOpen,
  setIsModalOpen,
  isLoading,
  editingProgram,
  setEditingProgram,
}: {
  isModalOpen: boolean 
  setIsModalOpen: (open: boolean) => void
  isLoading: boolean,
  editingProgram: Program | null,
  setEditingProgram: (value: SetStateAction<Program | null>) => void
}) => {

  const createProgramMutation = useCreateProgramMutation()
  const updateProgramMutation = useUpdateProgramMutation()
  const { notify } = useToast()

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

  return (
    <Modal defaultOpen={isModalOpen}>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-background w-full max-w-md rounded-lg shadow-lg">
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-lg font-bold">
                {editingProgram ? 'Edit Program' : 'Add Program'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="">
              <Form
                schema={programSchema}
                onSubmit={e =>
                  editingProgram ? handleUpdate(e.formData) : handleCreate(e.formData)
                }
                validator={validator}
                formData={{
                  name: editingProgram?.name || '',
                  duration: editingProgram?.duration || 0,
                }}
                uiSchema={programUiSchema}
                widgets={{
                  text: TextWidget,
                }}
              >
                <div className="flex w-full justify-center gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isLoading}
                    className="w-full flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full flex-1"
                  >
                    {isLoading ? 'Saving...' : editingProgram ? 'Update Program' : 'Create Program'}
                  </Button>
                </div>
              </Form>

              {/* <ProgramForm
                key={editingProgram ? editingProgram.id : 'new'}
                initialData={
                  editingProgram
                    ? {
                        name: editingProgram.name,
                        duration: editingProgram.duration,
                      }
                    : undefined
                }
                onSubmit={editingProgram ? handleUpdate : handleCreate}
                onCancel={() => setIsModalOpen(false)}
              /> */}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default AddProgramModal
