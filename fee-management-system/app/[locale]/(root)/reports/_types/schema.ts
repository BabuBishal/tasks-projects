import { z } from 'zod'

export const reportFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  programId: z.string().optional(),
  status: z.string().optional(),
})

export const reportDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  generatedAt: z.date(),
  data: z.record(z.string(), z.unknown()),
})

export type ReportFilter = z.infer<typeof reportFilterSchema>
export type ReportData = z.infer<typeof reportDataSchema>

export type PaymentReportStatsResponse = {
  byProgram: {
    program: string
    totalPayments: number
    totalAmount: number
    paidCount: number
    partialCount: number
    pendingCount: number
    overdueCount: number
  }[]
  bySemester: {
    semester: number
    totalPayments: number
    totalAmount: number
  }[]
  byMethod: {
    method: string
    count: number
    amount: number
  }[]
}
