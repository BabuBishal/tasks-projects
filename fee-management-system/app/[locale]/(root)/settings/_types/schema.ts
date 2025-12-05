import { z } from 'zod'

export const settingsSchema = z.object({
  institutionName: z.string().min(1, 'Institution Name is required'),
  institutionAddress: z.string().nullable().optional(),
  institutionPhone: z.string().nullable().optional(),
  institutionEmail: z.string().email().nullable().optional().or(z.literal('')),
  currency: z.string().default('Rs.'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  timezone: z.string().default('Asia/Kathmandu'),
  receiptPrefix: z.string().default('RCP'),
  lateFeePercentage: z.number().min(0).max(100).default(0),
  gracePeriodDays: z.number().min(0).default(7),
  reminderDaysBefore: z.number().min(0).default(3),
})

export const updateSettingsSchema = settingsSchema

export type Settings = z.infer<typeof settingsSchema>
export type SettingsUpdateInput = z.infer<typeof updateSettingsSchema>
export type SettingsResponse = Settings
