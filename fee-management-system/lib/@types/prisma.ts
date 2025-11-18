// ============================================
// Base Models
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
  academicYear: string;
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
  type: string;
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
  createdAt: Date;
  updatedAt: Date;
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
  status: string;
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
  feeStructure: FeeStructure;
  payments: Payment[];
};

export type PaymentWithStudent = Payment & {
  studentFee: {
    id: string;
    student: Student;
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

// ============================================
// API Response Types
// ============================================

export type DashboardStats = {
  title: string;
  value: string | number;
  desc: string;
  icon: string;
};

export type PaymentStats = {
  paid: number;
  partial: number;
  overdue: number;
  pending: number;
  total: number;
};

export type RecentPayment = {
  id: string;
  studentName: string;
  amount: number;
  method: string;
  date: Date;
  receiptNo: string;
};

export type OverdueFee = {
  id: string;
  studentName: string;
  studentRollNo: string;
  program: string;
  balance: number;
  dueDate: Date;
  daysOverdue: number;
};

export type DashboardData = {
  dashboardStats: DashboardStats[];
  paymentStats: PaymentStats;
  recentPayments: RecentPayment[];
  overdueFees: OverdueFee[];
};

// ============================================
// Form Types
// ============================================

export type CreateStudentInput = {
  name: string;
  email: string;
  rollNo: string;
  programId: string;
  semester: number;
  phone: string;
  address: string;
  year: number;
};

export type UpdateStudentInput = Partial<CreateStudentInput> & {
  id: string;
};

export type CreateFeeStructureInput = {
  programSemesterId: string;
  academicYear: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  totalFee: number;
};

export type CreatePaymentInput = {
  studentFeeId: string;
  method: string;
  amount: number;
  receiptNo: string;
};

export type AssignScholarshipInput = {
  studentId: string;
  scholarshipId: string;
};

export type CreateScholarshipInput = {
  name: string;
  type: "percentage" | "fixed";
  value: number;
};

// ============================================
// Status Enums
// ============================================

export enum FeeStatus {
  PENDING = "Pending",
  PARTIAL = "Partial",
  PAID = "Paid",
  OVERDUE = "Overdue",
}

export enum PaymentMethod {
  CASH = "Cash",
  ONLINE = "Online",
  BANK_TRANSFER = "Bank Transfer",
  CHEQUE = "Cheque",
}

export enum ScholarshipType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}
