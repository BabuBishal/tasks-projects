// ============================================
// API Response Types
// Types for API endpoint responses
// ============================================

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
