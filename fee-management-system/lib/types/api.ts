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

// Payment Stats API response
export type PaymentStatsResponse = {
  todaysCollections: number;
  monthCollections: number;
  pendingAmount: number;
  paymentSuccessRate: number;
  methodDistribution: {
    method: string;
    amount: number;
    count: number;
  }[];
  monthlyCollectionTrends: {
    month: string;
    amount: number;
  }[];
};

// Payment Report Stats API response
export type PaymentReportStatsResponse = {
  byProgram: {
    program: string;
    totalPayments: number;
    totalAmount: number;
    paidCount: number;
    partialCount: number;
    pendingCount: number;
    overdueCount: number;
  }[];
  bySemester: {
    semester: number;
    totalPayments: number;
    totalAmount: number;
  }[];
  byMethod: {
    method: string;
    count: number;
    amount: number;
  }[];
};

// Students API responses
export type StudentResponse = {
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
  status: string;
  createdAt: Date;
  updatedAt: Date;
  program: {
    id: string;
    name: string;
    duration: number;
  };
  fees: Array<{
    id: string;
    academicYear: string;
    originalFee: number;
    discount: number;
    payableFee: number;
    paid: number;
    balance: number;
    status: string;
    dueDate: Date;
    feeStructure: {
      programSemester: {
        semesterNo: number;
      };
    };
    payments: Array<{
      id: string;
      amount: number;
      method: string;
      date: Date;
      receiptNo: string;
    }>;
  }>;
  scholarships: Array<{
    scholarship: {
      id: string;
      name: string;
      type: string;
      value: number;
    };
  }>;
};

export type StudentsListResponse = StudentResponse[];

export type CreateStudentResponse = StudentResponse;

export type UpdateStudentResponse = StudentResponse;

export type DeleteStudentResponse = {
  message: string;
  student: {
    id: string;
    name: string;
    rollNo: string;
  };
};

// Programs API responses
export type ProgramResponse = {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    students: number;
  };
};

export type ProgramsListResponse = ProgramResponse[];

export type CreateProgramResponse = ProgramResponse;

export type UpdateProgramResponse = ProgramResponse;

export type DeleteProgramResponse = {
  message: string;
  program: {
    id: string;
    name: string;
  };
};

// Fee Structures API responses
export type FeeStructureResponse = {
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
  programSemester: {
    id: string;
    programId: string;
    semesterNo: number;
    program: {
      id: string;
      name: string;
      duration: number;
    };
  };
};

export type FeeStructuresListResponse = FeeStructureResponse[];

export type CreateFeeStructureResponse = FeeStructureResponse;

export type UpdateFeeStructureResponse = FeeStructureResponse;

export type DeleteFeeStructureResponse = {
  message: string;
  feeStructure: {
    id: string;
  };
};

// Payments API responses
export type PaymentResponse = {
  id: string;
  studentFeeId: string;
  method: string;
  amount: number;
  date: Date;
  receiptNo: string;
  createdAt: Date;
  updatedAt: Date;
  studentFee: {
    id: string;
    studentId: string;
    student: {
      id: string;
      name: string;
      rollNo: string;
      program: {
        id: string;
        name: string;
      };
    };
  };
};

export type PaymentsListResponse = PaymentResponse[];

export type CreatePaymentResponse = {
  payment: PaymentResponse;
  updatedFee: {
    id: string;
    paid: number;
    balance: number;
    status: string;
  };
};

// Scholarships API responses
export type ScholarshipResponse = {
  id: string;
  name: string;
  type: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ScholarshipsListResponse = ScholarshipResponse[];

// Auth API responses
export type RegisterResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
};

export type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
};

// Profile API responses
export type ProfileResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    id: string;
    userId: string;
    phone: string | null;
    position: string | null;
    role: string;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export type UpdateProfileResponse = ProfileResponse;

export type ChangePasswordResponse = {
  message: string;
};

export type UploadPhotoResponse = {
  message: string;
  profilePicture: string;
};

// Settings API responses
export type SettingsResponse = {
  id: string;
  userId: string;
  theme: string;
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateSettingsResponse = SettingsResponse;

// Promote Semester Response (already exists as BulkPromoteResult, but adding specific type)
export type PromoteSemesterResponse = {
  message: string;
  results: {
    success: {
      studentId: string;
      name: string;
      rollNo: string;
      oldSemester: number;
      newSemester: number | null;
      isGraduated?: boolean;
      message?: string;
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
};
