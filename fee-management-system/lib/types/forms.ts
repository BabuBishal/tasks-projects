export type StudentFormInputs = {
  name: string
  email: string
  programId: string
  semester: number
  phone: string
  address: string
  scholarshipId?: string
}

export type CreateStudentInput = {
  name: string
  email: string
  programId: string
  semester: number
  phone?: string
  address?: string
  scholarshipId?: string
}

export type UpdateStudentInput = Partial<CreateStudentInput> & {
  id: string
}

export type FeeStructureFormInputs = {
  programId?: string
  semesterNo?: string
  programSemesterId?: string
  tuitionFee?: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  miscFee?: number
  totalFee?: number
}

export type CreateFeeStructureInput = FeeStructureFormInputs

export type UpdateFeeStructureInput = Partial<FeeStructureFormInputs> & {
  id: string
}

export type PaymentFormInputs = {
  id: string
  amount: number
  method: string
  selectedFeeIds?: string
}

export type CreatePaymentInput = {
  studentFeeId: string
  method: string
  amount: number
  receiptNo: string
}

export type ScholarshipFormInputs = {
  name: string
  type: 'percentage' | 'fixed'
  value: number
}

export type CreateScholarshipInput = ScholarshipFormInputs

export type AssignScholarshipInput = {
  studentId: string
  scholarshipId: string
}

export type LoginFormInputs = {
  email: string
  password: string
}

export type RegisterFormInputs = {
  name: string
  email: string
  password: string
}

export type BulkImportFormInputs = {
  csvContent: string
}
