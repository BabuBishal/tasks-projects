"use client";

import { Card, CardContent } from "@/shared/ui/card/Card";
import Badge from "@/shared/ui/badges/Badges";
import { Coins } from "lucide-react";
import { formatCurrency } from "@/lib/utils/utils";
import { FeeStructureResponse } from "@/lib/types/api";

// interface FeeStructure {
//   id: string;
//   programSemester: {
//     semesterNo: number;
//     program: {
//       name: string;
//     };
//   };
//   tuitionFee: number;
//   totalFee: number;
// }

interface FeeStructureCardProps {
  feeStructure: FeeStructureResponse;
  onClick: () => void;
}

export default function FeeStructureCard({
  feeStructure,
  onClick,
}: FeeStructureCardProps) {
  return (
    <Card
      className="cursor-pointer group relative overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardContent className="p-5 space-y-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {feeStructure?.programSemester?.program?.name}
            </p>
            <h3 className="font-bold text-xl text-foreground">
              Semester {feeStructure?.programSemester?.semesterNo}
            </h3>
          </div>
          <Badge
            variant="info"
            className="bg-primary/10 text-primary border-primary/20 shadow-sm"
          >
            Active
          </Badge>
        </div>

        <div className="pt-4 border-t border-border/50 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Tuition Fee</span>
            <span className="font-medium">
              {formatCurrency(feeStructure.tuitionFee)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-dashed border-border/50">
            <span className="text-sm font-medium text-foreground">
              Total Fee
            </span>
            <div className="flex items-center font-bold text-lg text-primary">
              <Coins className="w-4 h-4 mr-1.5" />
              {formatCurrency(feeStructure.totalFee)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
