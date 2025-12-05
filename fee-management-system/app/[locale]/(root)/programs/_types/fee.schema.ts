import { z } from 'zod'
import { programSemesterSchema, programSchema } from './schema'

export const feeStructureSchema = z.object({
  id: z.string(),
  programSemesterId: z.string(),
  tuitionFee: z.number().int().min(0, 'Tuition fee must be non-negative'),
  labFee: z.number().int().min(0, 'Lab fee must be non-negative'),
  libraryFee: z.number().int().min(0, 'Library fee must be non-negative'),
  sportsFee: z.number().int().min(0, 'Sports fee must be non-negative'),
  miscFee: z.number().int().min(0, 'Miscellaneous fee must be non-negative'),
  totalFee: z.number().int().min(0, 'Total fee must be non-negative'),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export const createFeeStructureSchema = feeStructureSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    totalFee: true, 
  })
  .extend({
    totalFee: z.number().int().optional(),
  })

export const updateFeeStructureSchema = createFeeStructureSchema.partial()

export type FeeStructure = z.infer<typeof feeStructureSchema>
export type CreateFeeStructureInput = z.infer<typeof createFeeStructureSchema>
export type UpdateFeeStructureInput = z.infer<typeof updateFeeStructureSchema>

export const feeStructureResponseSchema = feeStructureSchema.extend({
  programSemester: programSemesterSchema.extend({
    program: programSchema.pick({ name: true }).optional(),
  }),
})

export type FeeStructureResponse = z.infer<typeof feeStructureResponseSchema>
