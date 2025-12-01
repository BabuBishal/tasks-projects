"use client";

import { FeeStructureResponse } from "@/lib/types/api";
import FeeStructureCard from "./FeeStructureCard";

// interface FeeStructure {
//   id: string;
//   programSemester: {
//     programId: string;
//     semesterNo: number;
//     program: {
//       name: string;
//     };
//   };
//   tuitionFee: number;
//   labFee: number;
//   libraryFee: number;
//   sportsFee: number;
//   miscFee: number;
//   totalFee: number;
// }

interface FeeStructureListProps {
  feeStructures: FeeStructureResponse[];
  onSelect: (feeStructure: FeeStructureResponse) => void;
}

export default function FeeStructureList({
  feeStructures,
  onSelect,
}: FeeStructureListProps) {
  if (feeStructures.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
        <p className="text-muted-foreground">
          No fee structures found. Add one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feeStructures.map((fee) => (
        <FeeStructureCard
          key={fee.id}
          feeStructure={fee}
          onClick={() => onSelect(fee)}
        />
      ))}
    </div>
  );
}
