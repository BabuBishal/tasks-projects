"use client";

import { Card, CardContent } from "@/components/ui/card/Card";
import Badge from "@/components/ui/badges/Badges";
import { Coins } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface FeeStructure {
  id: string;
  programSemester: {
    semesterNo: number;
    program: {
      name: string;
    };
  };
  totalFee: number;
}

interface FeeStructureCardProps {
  feeStructure: FeeStructure;
  onClick: () => void;
}

export default function FeeStructureCard({
  feeStructure,
  onClick,
}: FeeStructureCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              Semester {feeStructure.programSemester.semesterNo}
            </h3>
          </div>
          <Badge
            variant="info"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Active
          </Badge>
        </div>

        <div className="pt-2 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Fee</span>
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
