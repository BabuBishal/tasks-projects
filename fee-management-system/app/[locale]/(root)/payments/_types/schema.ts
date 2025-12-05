import { z } from 'zod'
import { feeStructureResponseSchema } from '../../programs/_types'

export const studentFeeStatusSchema = z.enum(['Pending', 'Partial', 'Paid', 'Overdue'])

export const studentFeeSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  feeStructureId: z.string(),
  academicYear: z.string(),
  dueDate: z.date().or(z.string()),
  status: studentFeeStatusSchema,
  originalFee: z.number(),
  totalFee: z.number(),
  payableFee: z.number(),
  discount: z.number(),
  balance: z.number(),
  paid: z.number(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

// --- Payment Schemas ---

export const paymentMethodSchema = z.enum(['Cash', 'Cheque', 'Bank Transfer', 'Card'])

export const paymentSchema = z.object({
  id: z.string(),
  studentFeeId: z.string(),
  method: paymentMethodSchema,
  amount: z.number().positive(),
  date: z.date().or(z.string()),
  receiptNo: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export const createPaymentSchema = z.object({
  studentId: z.string(),
  amount: z.number().positive(),
  method: paymentMethodSchema,
  selectedFeeIds: z.array(z.string()),
})

// --- Response/View Schemas ---

export const paymentHistoryItemSchema = paymentSchema.extend({
  studentId: z.string(),
  studentName: z.string(),
  program: z.string(),
  status: z.string(),
  semester: z.number().optional(),
  feeBalance: z.number(),
  feeStatus: z.string(),
  academicYear: z.string(),
})

export const studentFeeResponseSchema = studentFeeSchema.extend({
  feeStructure: feeStructureResponseSchema,
  payments: z.array(paymentSchema).optional(),
})

// --- Stats Schemas ---

export const paymentStatsSchema = z.object({
  paid: z.number(),
  partial: z.number(),
  overdue: z.number(),
  pending: z.number(),
  total: z.number(),
})

export const recentPaymentSchema = z.object({
  id: z.string(),
  studentName: z.string(),
  amount: z.number(),
  method: z.string(),
  date: z.date().or(z.string()),
  receiptNo: z.string(),
})

export const overdueFeeSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  studentName: z.string(),
  studentRollNo: z.string(),
  program: z.string(),
  academicYear: z.string(),
  semester: z.number(),
  totalFee: z.number(),
  paidAmount: z.number(),
  balance: z.number(),
  paymentPercentage: z.number(),
  dueDate: z.date().or(z.string()),
  daysOverdue: z.number(),
  urgencyLevel: z.enum(['critical', 'high', 'medium', 'recent']),
  currentSemester: z.number(),
  semestersBehind: z.number(),
  status: z.string(),
})

// --- Additional Response Schemas ---

export const paymentsResponseSchema = z.object({
  data: z.array(paymentHistoryItemSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
  totalAmount: z.number(),
  totalPayments: z.number(),
  todayPayments: z.number(),
})

export const paymentMethodDistributionSchema = z.object({
  method: z.string(),
  amount: z.number(),
  count: z.number(),
})

export const monthlyCollectionTrendSchema = z.object({
  month: z.string(),
  amount: z.number(),
})

export const paymentStatsResponseSchema = z.object({
  todaysCollections: z.number(),
  monthCollections: z.number(),
  pendingAmount: z.number(),
  paymentSuccessRate: z.number(),
  methodDistribution: z.array(paymentMethodDistributionSchema),
  monthlyCollectionTrends: z.array(monthlyCollectionTrendSchema),
})

export const addPaymentRequestSchema = z.object({
  studentId: z.string(),
  amount: z.number(),
  method: z.string(),
  selectedFeeIds: z.array(z.string()),
})

export const addPaymentResponseSchema = z.object({
  message: z.string(),
  receiptNo: z.string(),
  totalPaid: z.number(),
  feesUpdated: z.number(),
  payments: z.array(
    z.object({
      id: z.string(),
      studentFeeId: z.string(),
      method: z.string(),
      amount: z.number(),
      receiptNo: z.string(),
      date: z.date().or(z.string()),
    })
  ),
  updatedFees: z.array(
    z.object({
      id: z.string(),
      academicYear: z.string(),
      semesterNo: z.number(),
      paid: z.number(),
      balance: z.number(),
      status: z.string(),
    })
  ),
})

// --- Types ---

export type StudentFee = z.infer<typeof studentFeeSchema>
export type Payment = z.infer<typeof paymentSchema>
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type PaymentHistoryItem = z.infer<typeof paymentHistoryItemSchema>
export type StudentFeeResponse = z.infer<typeof studentFeeResponseSchema>
export type PaymentStats = z.infer<typeof paymentStatsSchema>
export type RecentPayment = z.infer<typeof recentPaymentSchema>
export type OverdueFee = z.infer<typeof overdueFeeSchema>

export type PaymentsResponse = z.infer<typeof paymentsResponseSchema>
export type PaymentMethodDistribution = z.infer<typeof paymentMethodDistributionSchema>
export type MonthlyCollectionTrend = z.infer<typeof monthlyCollectionTrendSchema>
export type PaymentStatsResponse = z.infer<typeof paymentStatsResponseSchema>
export type AddPaymentRequest = z.infer<typeof addPaymentRequestSchema>
export type AddPaymentResponse = z.infer<typeof addPaymentResponseSchema>
