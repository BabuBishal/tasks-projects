import { Modal } from '@/shared/ui/modal/Modal'

import { Program } from '../page'
import ProgramForm from '@/app/[locale]/(root)/programs/_components/ProgramForm'
import { X } from 'lucide-react'
import Form from '@rjsf/core'
import programSchema from '../_schema/program.schema'
import validator from '@/shared/forms/rjsf/validators/validator'
import { programUiSchema } from '../_schema/ui.schema'
import TextWidget from '@/shared/forms/rjsf/widgets/text-widget/TextWidget'
import '@/shared/forms/rjsf/styles/rjsf.scss'
import { Button } from '@/shared/ui/button/Button'

const AddProgramModal = ({
  isModalOpen,
  setIsModalOpen,
  editingProgram,
  handleUpdate,
  handleCreate,
  isLoading,
}: {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  editingProgram: Program | null
  handleUpdate: (data: { name: string; duration: number }) => void
  handleCreate: (data: { name: string; duration: number }) => void
  isLoading: boolean
}) => {
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
