import { z } from 'zod'

// --- Program Schemas ---

export const programSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Program name is required'),
  duration: z.number().int().min(1, 'Duration must be at least 1 semester'),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export const createProgramSchema = programSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const updateProgramSchema = createProgramSchema.partial()

// --- Program Semester Schemas ---

export const programSemesterSchema = z.object({
  id: z.string(),
  programId: z.string(),
  semesterNo: z.number().int().min(1),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

// --- Response Schemas (with relations) ---

export const programResponseSchema = programSchema.extend({
  // semesters: z.array(programSemesterSchema).optional(),
})

// --- Types ---

export type Program = z.infer<typeof programSchema>
export type CreateProgramInput = z.infer<typeof createProgramSchema>
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
export type ProgramResponse = z.infer<typeof programResponseSchema>

export type ProgramSemester = z.infer<typeof programSemesterSchema>
