export const API_ROUTES = {
  students: "/api/students",
  payments: "/api/payments",
  paymentAdd: "/api/payment/add",
  paymentHistory: "/api/payment/history",
  dashboardStats: "/api/dashboard-stats",
  programs: "/api/programs",
  feeStructures: "/api/fee-structures",
  scholarships: "/api/scholarships",
  studentWithId: (id: string) => `/api/students/${id}`,
  programWithId: (id: string) => `/api/programs/${id}`,
  feeStructureWithId: (id: string) => `/api/fee-structures/${id}`,
};
