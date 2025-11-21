"use client";

import { Modal } from "@/components/ui/modal/Modal";
import { Button } from "@/components/ui/button/Button";
import { Edit, Trash2, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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

interface FeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeStructure: FeeStructure | null;
  onEdit: (fee: FeeStructure) => void;
  onDelete: (id: string) => void;
}

export default function FeeDetailsModal({
  isOpen,
  onClose,
  feeStructure,
  onEdit,
  onDelete,
}: FeeDetailsModalProps) {
  if (!feeStructure) return null;

  return (
    <Modal defaultOpen={isOpen}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-muted/30">
              <div>
                <h2 className="text-lg font-bold">Fee Details</h2>
                <p className="text-sm text-muted-foreground">
                  {feeStructure.programSemester.program.name} - Sem{" "}
                  {feeStructure.programSemester.semesterNo}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <FeeRow label="Tuition Fee" amount={feeStructure.tuitionFee} />
                <FeeRow label="Lab Fee" amount={feeStructure.labFee} />
                <FeeRow label="Library Fee" amount={feeStructure.libraryFee} />
                <FeeRow label="Sports Fee" amount={feeStructure.sportsFee} />
                <FeeRow label="Miscellaneous" amount={feeStructure.miscFee} />
              </div>

              <div className="pt-4 mt-4 border-t flex justify-between items-center">
                <span className="font-bold text-lg">Total Fee</span>
                <span className="font-bold text-xl text-primary">
                  {formatCurrency(feeStructure.totalFee)}
                </span>
              </div>
            </div>

            <div className="p-4 border-t bg-muted/30 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  onDelete(feeStructure.id);
                  onClose();
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => {
                  onEdit(feeStructure);
                  onClose();
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

const FeeRow = ({ label, amount }: { label: string; amount: number }) => (
  <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{formatCurrency(amount)}</span>
  </div>
);
