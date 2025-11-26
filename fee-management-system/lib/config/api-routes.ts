export const API_ROUTES = {
  // Auth
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },

  // Students
  students: "/api/students",
  studentWithId: (id: string) => `/api/students/${id}`,
  studentBulkDelete: "/api/students/bulk-delete",
  studentBulkImport: "/api/students/bulk-import",
  studentPromoteSemester: "/api/students/promote-semester",

  // Payments
  payments: "/api/payments",
  paymentStats: "/api/payments/stats",
  paymentAdd: "/api/payment/add",
  paymentHistory: "/api/payment/history",
  payment: "/api/payment",

  // Dashboard
  dashboardStats: "/api/dashboard-stats",

  // Programs
  programs: "/api/programs",
  programWithId: (id: string) => `/api/programs/${id}`,

  // Fee Structures
  feeStructures: "/api/fee-structures",
  feeStructureWithId: (id: string) => `/api/fee-structures/${id}`,

  // Scholarships
  scholarships: "/api/scholarships",

  // Profile
  profile: "/api/profile",
  profilePassword: "/api/profile/password",
  profilePhoto: "/api/profile/photo",

  // Settings
  settings: "/api/settings",

  // Reports
  reports: {
    paymentStats: "/api/reports/payment-stats",
  },
} as const;
