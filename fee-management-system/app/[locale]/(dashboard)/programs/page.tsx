"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Plus, X } from "lucide-react";
import ProgramList from "@/components/programs/ProgramList";
import ProgramForm from "@/components/programs/ProgramForm";
import { Modal } from "@/components/ui/modal/Modal";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import { useToast } from "@/components/ui/toast";
import { useGetProgramsQuery } from "@/hooks/query-hooks/programs";
import {
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} from "@/hooks/query-hooks/programs";

interface Program {
  id: string;
  name: string;
  duration: number;
  _count?: {
    students: number;
  };
}

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const { notify } = useToast();

  const { data: programs, isLoading } = useGetProgramsQuery();

  const createProgramMutation = useCreateProgramMutation();
  const updateProgramMutation = useUpdateProgramMutation();
  const deleteProgramMutation = useDeleteProgramMutation();

  const handleCreate = async (data: { name: string; duration: number }) => {
    try {
      await createProgramMutation.mutateAsync(data);

      notify({
        title: "Success",
        description: "Program created successfully",
        type: "success",
      });
      setIsModalOpen(false);
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to create program",
        type: "error",
      });
    }
  };

  const handleUpdate = async (data: { name: string; duration: number }) => {
    if (!editingProgram) return;

    try {
      await updateProgramMutation.mutateAsync({
        id: editingProgram.id,
        data,
      });

      notify({
        title: "Success",
        description: "Program updated successfully",
        type: "success",
      });
      setIsModalOpen(false);
      setEditingProgram(null);
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to update program",
        type: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProgramMutation.mutateAsync(id);

      notify({
        title: "Success",
        description: "Program deleted successfully",
        type: "success",
      });
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to delete program",
        type: "error",
      });
    }
  };

  const openCreateModal = () => {
    setEditingProgram(null);
    setIsModalOpen(true);
  };

  const openEditModal = (program: Program) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Programs", href: "/programs" }]} />
      <div className="flex justify-between items-end gap-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Programs</h1>
          <p className="text-muted-foreground">
            Manage academic programs and their durations
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ProgramList
          programs={programs || []}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

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
    </div>
  );
}
