import { z } from 'zod'
import {
  paymentStatsSchema,
  recentPaymentSchema,
  overdueFeeSchema,
} from '../../payments/_types/schema'

export const dashboardStatsSchema = z.object({
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  desc: z.string(),
  icon: z.string(),
})

export const programDistributionSchema = z.object({
  name: z.string(),
  value: z.number(),
})

export const dashboardDataSchema = z.object({
  dashboardStats: z.array(dashboardStatsSchema),
  paymentStats: paymentStatsSchema,
  recentPayments: z.array(recentPaymentSchema),
  overdueFees: z.array(overdueFeeSchema).optional(),
  programDistribution: z.array(programDistributionSchema),
})

export type DashboardStats = z.infer<typeof dashboardStatsSchema>
export type ProgramDistribution = z.infer<typeof programDistributionSchema>
export type DashboardData = z.infer<typeof dashboardDataSchema>
