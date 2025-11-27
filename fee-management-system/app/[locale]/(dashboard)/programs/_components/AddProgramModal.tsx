import { Modal } from "@/components/ui/modal";

import { Program } from "../page";
import ProgramForm from "@/components/programs/ProgramForm";
import { X } from "lucide-react";

const AddProgramModal = ({
  isModalOpen,
  setIsModalOpen,
  editingProgram,
  handleUpdate,
  handleCreate,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editingProgram: Program | null;
  handleUpdate: (data: { name: string; duration: number }) => void;
  handleCreate: (data: { name: string; duration: number }) => void;
}) => {
  return (
    <Modal defaultOpen={isModalOpen}>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold">
                {editingProgram ? "Edit Program" : "Add Program"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ProgramForm
                key={editingProgram ? editingProgram.id : "new"}
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
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddProgramModal;
