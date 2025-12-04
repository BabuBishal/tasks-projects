export type DashboardStats = {
  title: string
  value: string | number
  desc: string
  icon: string
}

export type PaymentStats = {
  paid: number
  partial: number
  overdue: number
  pending: number
  total: number
}

export type RecentPayment = {
  id: string
  studentName: string
  amount: number
  method: string
  date: Date
  receiptNo: string
}

export type OverdueFee = {
  id: string
  studentId: string
  studentName: string
  studentRollNo: string
  program: string
  academicYear: string
  semester: number
  totalFee: number
  paidAmount: number
  balance: number
  paymentPercentage: number
  dueDate: Date
  daysOverdue: number
  urgencyLevel: 'critical' | 'high' | 'medium' | 'recent'
  currentSemester: number
  semestersBehind: number
  status: string
}

export type ProgramDistribution = {
  name: string
  value: number
}

export type DashboardData = {
  dashboardStats: DashboardStats[]
  paymentStats: PaymentStats
  recentPayments: RecentPayment[]
  overdueFees?: OverdueFee[]
  programDistribution: ProgramDistribution[]
}

// Bulk operations API responses
export type BulkImportResult = {
  success: {
    row: number
    student: {
      name: string
      email: string
      rollNo: string
      program: string
      semester: number
    }
  }[]
  failed: {
    row: number
    data: Record<string, string>
    error: string
  }[]
  total: number
}

export type BulkDeleteResult = {
  deleted: number
  students: {
    id: string
    name: string
    rollNo: string
  }[]
}

export type BulkPromoteResult = {
  message: string
  results: {
    success: {
      studentId: string
      name: string
      rollNo: string
      oldSemester: number
      newSemester: number
      isGraduated?: boolean
      feeId?: string
      message?: string
    }[]
    failed: {
      studentId: string
      name?: string
      rollNo?: string
      error: string
    }[]
    total: number
  }
}

// Generic API response wrapper
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Error response
export type ApiError = {
  error: string
  details?: Record<string, unknown>
}

// Payment API responses
export type PaymentHistoryItem = {
  id: string
  studentId: string
  studentName: string
  program: string
  amount: number
  date: Date
  method: string
  receiptNo: string
  status: string
  semester?: number
  feeBalance: number
  feeStatus: string
  academicYear: string
}

export type PaymentsResponse = {
  data: PaymentHistoryItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  totalAmount: number
  totalPayments: number
  todayPayments: number
}

export type PaymentMethodDistribution = {
  method: string
  amount: number
  count: number
}

export type MonthlyCollectionTrend = {
  month: string
  amount: number
}

export type PaymentStatsResponse = {
  todaysCollections: number
  monthCollections: number
  pendingAmount: number
  paymentSuccessRate: number
  methodDistribution: PaymentMethodDistribution[]
  monthlyCollectionTrends: MonthlyCollectionTrend[]
}

export type AddPaymentRequest = {
  studentId: string
  amount: number
  method: string
  selectedFeeIds: string[]
}

export type AddPaymentResponse = {
  message: string
  receiptNo: string
  totalPaid: number
  feesUpdated: number
  payments: {
    id: string
    studentFeeId: string
    method: string
    amount: number
    receiptNo: string
    date: Date
  }[]
  updatedFees: {
    id: string
    academicYear: string
    semesterNo: number
    paid: number
    balance: number
    status: string
  }[]
}

export interface RegisterResponse {
  id: string
  email: string
  name: string
  message?: string
}

export interface LoginResponse {
  ok?: boolean
  error?: string | null
  status?: number
  url?: string | null
}

export interface FeeStructureResponse {
  id: string
  programSemester: FeeResponseProgramSemester
  tuitionFee: number
  labFee: number
  libraryFee: number
  sportsFee: number
  miscFee: number
  totalFee: number
}
export interface FeeResponseProgramSemester {
  programId: string
  semesterNo: number
  program?: {
    name: string
  }
}

export interface StudentResponse {
  id: string
  name: string
  email: string
  phone: string
  address: string
  rollNo: string
  year: number
  joinedYear: number
  semester: number
  status: string
  createdAt: string
  updatedAt: string
  programId: string
  program: ProgramResponse
  fees: StudentFee[]
  scholarships: StudentScholarship[]
}

export interface ProgramResponse {
  id: string
  name: string
  duration: number
  createdAt: string
  updatedAt: string
}

export interface StudentFee {
  id: string
  studentId: string
  feeStructureId: string
  academicYear: string
  dueDate: string
  status: 'Pending' | 'Paid' | 'Overdue'
  originalFee: number
  totalFee: number
  payableFee: number
  discount: number
  balance: number
  paid: number
  createdAt: string
  updatedAt: string
  feeStructure: FeeStructure
  payments: Payment[]
}

export interface FeeStructure {
  id: string
  programSemesterId: string
  tuitionFee: number
  labFee: number
  libraryFee: number
  miscFee: number
  sportsFee: number
  totalFee: number
  createdAt: string
  updatedAt: string
  programSemester: ProgramSemester
}

export interface ProgramSemester {
  id: string
  programId: string
  semesterNo: number
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  feeId: string
  amount: number
  date: string
  method: string
}

export interface StudentScholarship {
  id: string
  studentId: string
  scholarshipId: string
  createdAt: string
  updatedAt: string
  scholarship: Scholarship
}

export interface Scholarship {
  id: string
  name: string
  type: 'percentage' | 'fixed'
  value: number
  createdAt: string
  updatedAt: string
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// interface DashboardData {
//   dashboardStats: {
//     title: string;
//     value: string;
//     desc: string;
//     icon: string;
//   }[];
//   paymentStats: {
//     paid: number;
//     partial: number;
//     overdue: number;
//     pending: number;
//     total: number;
//   };
//   recentPayments: {
//     id: string;
//     studentId: string;
//     studentName: string;
//     amount: number;
//     method: string;
//     date: string;
//     receiptNo: string;
//     semester: number;
//   }[];
//   overdueFees: {
//     id: string;
//     studentId: string;
//     studentName: string;
//     studentRollNo: string;
//     program: string;
//     balance: number;
//     dueDate: string;
//     daysOverdue: number;
//     semester: number;
//   }[];
// }
// Settings API response
export interface SettingsResponse {
  institutionName: string
  institutionAddress: string | null
  institutionPhone: string | null
  institutionEmail: string | null
  currency: string
  dateFormat: string
  timezone: string
  receiptPrefix: string
  lateFeePercentage: number
  gracePeriodDays: number
  reminderDaysBefore: number
}
