import FeeStructureCard from "./FeeStructureCard";
import { BookOpen } from "lucide-react";

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

interface FeeStructureListProps {
  feeStructures: FeeStructure[];
  onSelect: (feeStructure: FeeStructure) => void;
}

export default function FeeStructureList({
  feeStructures,
  onSelect,
}: FeeStructureListProps) {
  // Group by program
  const groupedFees = feeStructures.reduce((acc, fee) => {
    const programName = fee.programSemester.program.name;
    if (!acc[programName]) {
      acc[programName] = [];
    }
    acc[programName].push(fee);
    return acc;
  }, {} as Record<string, FeeStructure[]>);

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
    <div className="space-y-8">
      {Object.entries(groupedFees).map(([programName, fees]) => (
        <div key={programName} className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <div className="p-2 bg-primary/10 rounded-md">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{programName}</h2>
            <span className="text-sm text-muted-foreground ml-auto bg-muted px-2 py-1 rounded-full">
              {fees.length} Semesters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fees
              .sort(
                (a, b) =>
                  a.programSemester.semesterNo - b.programSemester.semesterNo
              )
              .map((fee) => (
                <FeeStructureCard
                  key={fee.id}
                  feeStructure={fee}
                  onClick={() => onSelect(fee)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
