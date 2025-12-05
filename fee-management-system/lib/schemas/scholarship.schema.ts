import { z } from 'zod'

export const scholarshipSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  value: z.number(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export type Scholarship = z.infer<typeof scholarshipSchema>
export type ScholarshipResponse = Scholarship
export type ScholarshipsListResponse = ScholarshipResponse[]
