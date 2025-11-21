"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Plus, X } from "lucide-react";
import FeeStructureList from "@/components/fees/FeeStructureList";
import FeeStructureForm from "@/components/fees/FeeStructureForm";
import FeeDetailsModal from "@/components/fees/FeeDetailsModal";
import { Modal } from "@/components/ui/modal/Modal";
import { useToast } from "@/components/ui/toast";
import { useQuery } from "@tanstack/react-query";

interface FeeStructure {
  id: string;
  academicYear: string;
  programSemester: {
    programId: string;
    semesterNo: number;
    program: {
      name: string;
    };
  };
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  totalFee: number;
}

export default function FeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { notify } = useToast();

  const {
    data: feeStructures,
    isLoading,
    refetch,
  } = useQuery<FeeStructure[]>({
    queryKey: ["feeStructures"],
    queryFn: async () => {
      const res = await fetch("/api/fee-structures");
      if (!res.ok) throw new Error("Failed to fetch fee structures");
      return res.json();
    },
  });

  const { data: programs } = useQuery<any[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      const res = await fetch("/api/programs");
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });

  const handleCreate = async (data: any) => {
    try {
      const res = await fetch("/api/fee-structures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create fee structure");

      notify({
        title: "Success",
        description: "Fee structure created successfully",
        type: "success",
      });
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      notify({
        title: "Error",
        description: "Failed to create fee structure",
        type: "error",
      });
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingFee) return;

    try {
      const res = await fetch(`/api/fee-structures/${editingFee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update fee structure");

      notify({
        title: "Success",
        description: "Fee structure updated successfully",
        type: "success",
      });
      setIsModalOpen(false);
      setEditingFee(null);
      refetch();
    } catch (error) {
      notify({
        title: "Error",
        description: "Failed to update fee structure",
        type: "error",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/fee-structures/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete fee structure");

      notify({
        title: "Success",
        description: "Fee structure deleted successfully",
        type: "success",
      });
      setIsDetailsOpen(false);
      refetch();
    } catch (error) {
      notify({
        title: "Error",
        description: "Failed to delete fee structure",
        type: "error",
      });
    }
  };

  const openCreateModal = () => {
    setEditingFee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (fee: FeeStructure) => {
    setEditingFee(fee);
    setIsModalOpen(true);
  };

  const handleSelectFee = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Structures</h1>
          <p className="text-muted-foreground">
            Manage fee structures for different programs
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Fee Structure
        </Button>
      </div>

      {isLoading ? (
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
                            programId: editingFee.programSemester.programId,
                            semesterNo: editingFee.programSemester.semesterNo,
                          },
                          academicYear: editingFee.academicYear,
                          tuitionFee: editingFee.tuitionFee,
                          labFee: editingFee.labFee,
                          libraryFee: editingFee.libraryFee,
                          sportsFee: editingFee.sportsFee,
                          miscFee: editingFee.miscFee,
                        }
                      : undefined
                  }
                  programs={programs || []}
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
