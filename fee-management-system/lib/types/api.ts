// Dashboard API responses
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
  studentId: string;
  studentName: string;
  studentRollNo: string;
  program: string;

  // Fee details
  academicYear: string;
  semester: number;
  totalFee: number;
  paidAmount: number;
  balance: number;
  paymentPercentage: number;

  // Urgency metrics
  dueDate: Date;
  daysOverdue: number;
  urgencyLevel: "critical" | "high" | "medium" | "recent";

  // Context
  currentSemester: number;
  semestersBehind: number;
  status: string;
};

export type ProgramDistribution = {
  name: string;
  value: number;
};

export type DashboardData = {
  dashboardStats: DashboardStats[];
  paymentStats: PaymentStats;
  recentPayments: RecentPayment[];
  overdueFees: OverdueFee[];
  programDistribution: ProgramDistribution[];
};

// Bulk operations API responses
export type BulkImportResult = {
  success: {
    row: number;
    student: {
      name: string;
      email: string;
      rollNo: string;
      program: string;
      semester: number;
    };
  }[];
  failed: {
    row: number;
    data: Record<string, string>;
    error: string;
  }[];
  total: number;
};

export type BulkDeleteResult = {
  deleted: number;
  students: {
    id: string;
    name: string;
    rollNo: string;
  }[];
};

export type BulkPromoteResult = {
  success: {
    studentId: string;
    name: string;
    rollNo: string;
    oldSemester: number;
    newSemester: number;
    feeId?: string;
  }[];
  failed: {
    studentId: string;
    name?: string;
    rollNo?: string;
    error: string;
  }[];
  total: number;
};

// Generic API response wrapper
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Error response
export type ApiError = {
  error: string;
  details?: Record<string, unknown>;
};

// Payment API responses
export type PaymentHistoryItem = {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  amount: number;
  date: Date;
  method: string;
  receiptNo: string;
  status: string;
  feeBalance: number;
  feeStatus: string;
  academicYear: string;
};

export type PaymentsResponse = {
  payments: PaymentHistoryItem[];
  totalAmount: number;
  totalPayments: number;
  todayPayments: number;
};

export type PaymentMethodDistribution = {
  method: string;
  amount: number;
  count: number;
};

export type MonthlyCollectionTrend = {
  month: string;
  amount: number;
};

export type PaymentStatsResponse = {
  todaysCollections: number;
  monthCollections: number;
  pendingAmount: number;
  paymentSuccessRate: number;
  methodDistribution: PaymentMethodDistribution[];
  monthlyCollectionTrends: MonthlyCollectionTrend[];
};

export type AddPaymentRequest = {
  studentId: string;
  amount: number;
  method: string;
  selectedFeeIds: string[];
};

export type AddPaymentResponse = {
  message: string;
  receiptNo: string;
  totalPaid: number;
  feesUpdated: number;
  payments: {
    id: string;
    studentFeeId: string;
    method: string;
    amount: number;
    receiptNo: string;
    date: Date;
  }[];
  updatedFees: {
    id: string;
    academicYear: string;
    semesterNo: number;
    paid: number;
    balance: number;
    status: string;
  }[];
};

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  message?: string;
}

export interface LoginResponse {
  ok?: boolean;
  error?: string | null;
  status?: number;
  url?: string | null;
}

export interface FeeStructureResponse {
  id: string;
  programSemester: FeeResponseProgramSemester;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  miscFee: number;
  totalFee: number;
}
export interface FeeResponseProgramSemester {
  programId: string;
  semesterNo: number;
  program?: {
    name: string;
  };
}
