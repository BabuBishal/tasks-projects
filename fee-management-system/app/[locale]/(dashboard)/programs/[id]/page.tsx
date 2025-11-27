"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button/Button";
import { Plus, X } from "lucide-react";
import FeeStructureList from "@/components/fees/FeeStructureList";
import FeeStructureForm from "@/components/fees/FeeStructureForm";
import FeeDetailsModal from "@/components/fees/FeeDetailsModal";
import { Modal } from "@/components/ui/modal/Modal";
import { useToast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import {
  useGetFeeStructuresQuery,
  useCreateFeeStructureMutation,
  useUpdateFeeStructureMutation,
  useDeleteFeeStructureMutation,
} from "@/hooks/query-hooks/fees";
import { useGetProgramQuery } from "@/hooks/query-hooks/programs";
import { FeeStructureResponse } from "@/lib/types";
import { FeeStructure } from "@prisma/client";

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

export default function ProgramDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { notify } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] =
    useState<Partial<FeeStructureResponse> | null>(null);
  const [selectedFee, setSelectedFee] =
    useState<Partial<FeeStructureResponse> | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: program, isLoading } = useGetProgramQuery(id);
  const { data: allFeeStructures, isLoading: isFeesLoading } =
    useGetFeeStructuresQuery();

  // Filter fee structures for this program
  const feeStructures = allFeeStructures?.filter(
    (fee: FeeStructureResponse) => fee.programSemester.programId === id
  );

  // Mutations
  const createFeeStructure = useCreateFeeStructureMutation();
  const updateFeeStructure = useUpdateFeeStructureMutation();
  const deleteFeeStructure = useDeleteFeeStructureMutation();

  const handleCreate = async (formData: {
    programSemester: { programId: string; semesterNo: number };
    tuitionFee: number;
    labFee: number;
    libraryFee: number;
    sportsFee: number;
    miscFee: number;
  }) => {
    const data = {
      programId: formData.programSemester.programId,
      semesterNo: formData.programSemester.semesterNo,
      tuitionFee: formData.tuitionFee,
      labFee: formData.labFee,
      libraryFee: formData.libraryFee,
      sportsFee: formData.sportsFee,
      miscFee: formData.miscFee,
    };

    createFeeStructure.mutate(data, {
      onSuccess: () => {
        notify({
          title: "Success",
          description: "Fee structure created successfully",
          type: "success",
        });
        setIsModalOpen(false);
      },
      onError: (error: Error) => {
        notify({
          title: "Error",
          description: error.message || "Failed to create fee structure",
          type: "error",
        });
      },
    });
  };

  const handleUpdate = async (formData: {
    programSemester: { programId: string; semesterNo: number };
    tuitionFee: number;
    labFee: number;
    libraryFee: number;
    sportsFee: number;
    miscFee: number;
  }) => {
    if (!editingFee) return;

    const data = {
      programId: formData.programSemester.programId,
      semesterNo: formData.programSemester.semesterNo,
      tuitionFee: formData.tuitionFee,
      labFee: formData.labFee,
      libraryFee: formData.libraryFee,
      sportsFee: formData.sportsFee,
      miscFee: formData.miscFee,
    };

    updateFeeStructure.mutate(
      { id: editingFee.id!, data },
      {
        onSuccess: () => {
          notify({
            title: "Success",
            description: "Fee structure updated successfully",
            type: "success",
          });
          setIsModalOpen(false);
          setEditingFee(null);
        },
        onError: (error: Error) => {
          notify({
            title: "Error",
            description: error.message || "Failed to update fee structure",
            type: "error",
          });
        },
      }
    );
  };

  const handleDelete = async (id: string) => {
    deleteFeeStructure.mutate(id, {
      onSuccess: () => {
        notify({
          title: "Success",
          description: "Fee structure deleted successfully",
          type: "success",
        });
        setIsDetailsOpen(false);
        setEditingFee(null);
      },
      onError: (error: Error) => {
        notify({
          title: "Error",
          description: error.message || "Failed to delete fee structure",
          type: "error",
        });
      },
    });
  };

  const openCreateModal = () => {
    setEditingFee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (fee: FeeStructureResponse) => {
    setEditingFee(fee);
    setIsModalOpen(true);
  };

  const handleSelectFee = (fee: FeeStructureResponse) => {
    setSelectedFee(fee);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!program) {
    return <div>Program not found</div>;
  }

  // ...

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Programs", href: "/programs" },
          { label: program.name, href: `/programs/${program.id}` },
        ]}
      />
      <div className="flex justify-between items-end gap-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{program.name}</h1>
          <p className="text-muted-foreground">
            {program.duration} Semesters • Manage Fee Structures
          </p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Fee Structure
        </Button>
      </div>

      {isFeesLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <FeeStructureList
          feeStructures={feeStructures || []}
          onSelect={handleSelectFee}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal defaultOpen={isModalOpen}>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-lg font-bold">
                  {editingFee ? "Edit Fee Structure" : "Add Fee Structure"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <FeeStructureForm
                  key={editingFee ? editingFee.id : "new"}
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
                  programs={[program]}
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
  );
}
