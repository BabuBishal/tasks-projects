// ============================================
// Form Input Types
// Types for form data and validation
// ============================================

// Student forms
export type StudentFormInputs = {
  name: string;
  email: string;
  programId: string;
  semester: number;
  phone: string;
  address: string;
  scholarshipId?: string;
};

export type CreateStudentInput = {
  name: string;
  email: string;
  programId: string;
  semester: number;
  phone?: string;
  address?: string;
  scholarshipId?: string;
};

export type UpdateStudentInput = Partial<CreateStudentInput> & {
  id: string;
};

// Fee Structure forms
export type FeeStructureFormInputs = {
  programSemesterId: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  totalFee: number;
};

export type CreateFeeStructureInput = FeeStructureFormInputs;

export type UpdateFeeStructureInput = Partial<FeeStructureFormInputs> & {
  id: string;
};

// Payment forms
export type PaymentFormInputs = {
  id: string;
  amount: number;
  method: string;
  selectedFeeIds?: string;
};

export type CreatePaymentInput = {
  studentFeeId: string;
  method: string;
  amount: number;
  receiptNo: string;
};

// Scholarship forms
export type ScholarshipFormInputs = {
  name: string;
  type: "percentage" | "fixed";
  value: number;
};

export type CreateScholarshipInput = ScholarshipFormInputs;

export type AssignScholarshipInput = {
  studentId: string;
  scholarshipId: string;
};

// Auth forms
export type LoginFormInputs = {
  email: string;
  password: string;
};

export type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

// Bulk import
export type BulkImportFormInputs = {
  csvContent: string;
};
