// ============================================
// Prisma Base Models
// Generated from Prisma schema - keep in sync with schema.prisma
// ============================================

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Program = {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProgramSemester = {
  id: string;
  programId: string;
  semesterNo: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FeeStructure = {
  id: string;
  programSemesterId: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  totalFee: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Scholarship = {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  programId: string;
  semester: number;
  phone: string;
  address: string;
  year: number;
  joinedYear: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
};

export type StudentScholarship = {
  id: string;
  studentId: string;
  scholarshipId: string;
};

export type StudentFee = {
  id: string;
  studentId: string;
  feeStructureId: string;
  academicYear: string;
  originalFee: number;
  discount: number;
  payableFee: number;
  paid: number;
  balance: number;
  status: "Pending" | "Partial" | "Paid" | "Overdue";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  studentFeeId: string;
  method: string;
  amount: number;
  date: Date;
  receiptNo: string;
  createdAt: Date;
  updatedAt: Date;
};

// ============================================
// Extended Types with Relations
// ============================================

export type StudentWithProgram = Student & {
  program: Program;
};

export type StudentWithFees = Student & {
  program: Program;
  fees: (StudentFee & {
    payments: Payment[];
    feeStructure: FeeStructure;
  })[];
};

export type StudentWithScholarships = Student & {
  program: Program;
  scholarships: (StudentScholarship & {
    scholarship: Scholarship;
  })[];
  fees?: StudentFee[];
};

export type StudentFull = Student & {
  program: Program;
  fees: (StudentFee & {
    payments: Payment[];
    feeStructure: FeeStructure;
  })[];
  scholarships: (StudentScholarship & {
    scholarship: Scholarship;
  })[];
};

export type StudentFeeWithDetails = StudentFee & {
  student: StudentWithProgram;
  feeStructure: FeeStructure & {
    programSemester?: ProgramSemester;
  };
  payments: Payment[];
};

export type PaymentWithStudent = Payment & {
  studentFee: {
    id: string;
    student: Student;
    feeStructure: FeeStructure & {
      programSemester?: ProgramSemester;
    };
  };
};

export type FeeStructureWithSemester = FeeStructure & {
  programSemester: ProgramSemester & {
    program: Program;
  };
};

export type ProgramWithSemesters = Program & {
  semesters: ProgramSemester[];
};

// Extended Student types with computed fields for API responses
export type StudentWithComputedTotals = Student & {
  program: Program;
  totalOriginalFee?: number;
  totalDiscount?: number;
  totalPayableFee?: number;
  totalPaid?: number;
  totalBalance?: number;
  totalScholarshipAmount?: number;
  fees?: (StudentFee & {
    feeStructure: FeeStructure;
    payments: Payment[];
  })[];
  feesList?: {
    id: string;
    academicYear: string;
    semesterNo: number;
    originalFee: number;
    discount: number;
    payableFee: number;
    paid: number;
    balance: number;
    status: string;
    dueDate: string | null;
  }[];
  scholarships?: (StudentScholarship & {
    scholarship: Scholarship;
    actualAmount?: number;
  })[];
};
