import { z } from 'zod'
import { studentFeeResponseSchema } from '../../payments/_types/schema'

export const studentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  rollNo: z.string().min(1, 'Roll number is required'),
  programId: z.string().min(1, 'Program is required'),
  semester: z.number().int().min(1, 'Semester must be at least 1'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  year: z.number().int().min(1, 'Year is required'),
  joinedYear: z.number().int().min(2000, 'Invalid joined year'),
  status: z.enum(['Active', 'Graduated', 'Suspended']).default('Active'),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

// Input Schemas
export const createStudentSchema = studentSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    rollNo: true, // Auto-generated
    year: true, // Auto-generated
    joinedYear: true, // Auto-generated
  })
  .extend({
    rollNo: z.string().optional(),
    year: z.number().optional(),
    joinedYear: z.number().optional(),
    scholarshipId: z.string().optional(),
  })

export const updateStudentSchema = createStudentSchema.partial().extend({
  status: z.enum(['Active', 'Graduated', 'Suspended']).optional(),
})

const programSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.number(),
})

const scholarshipSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['percentage', 'fixed']),
  value: z.number(),
})

const studentScholarshipSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  scholarshipId: z.string(),
  scholarship: scholarshipSchema,
  actualAmount: z.number().optional(),
})

const feeSchema = z.object({
  id: z.string(),
  academicYear: z.string(),
  semesterNo: z.number(),
  originalFee: z.number(),
  discount: z.number(),
  payableFee: z.number(),
  paid: z.number(),
  balance: z.number(),
  status: z.string(),
  dueDate: z.date().or(z.string()).nullable(),
})

// Extended Student Response Schema
export const studentResponseSchema = studentSchema.extend({
  program: programSchema,
  scholarships: z.array(studentScholarshipSchema).optional(),
  fees: z.array(studentFeeResponseSchema).optional(),
  feesList: z.array(feeSchema).optional(),
  totalOriginalFee: z.number().optional(),
  totalDiscount: z.number().optional(),
  totalPayableFee: z.number().optional(),
  totalPaid: z.number().optional(),
  totalBalance: z.number().optional(),
  totalScholarshipAmount: z.number().optional(),
})

export type Fee = z.infer<typeof feeSchema>

export type Student = z.infer<typeof studentSchema>
export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
export type StudentResponse = z.infer<typeof studentResponseSchema>

// Bulk Operations Schemas
export const bulkImportResultSchema = z.object({
  success: z.array(
    z.object({
      row: z.number(),
      student: z.object({
        name: z.string(),
        email: z.string(),
        rollNo: z.string(),
        program: z.string(),
        semester: z.number(),
      }),
    })
  ),
  failed: z.array(
    z.object({
      row: z.number(),
      data: z.record(z.string(), z.string()),
      error: z.string(),
    })
  ),
  total: z.number(),
})

export const bulkDeleteResultSchema = z.object({
  deleted: z.number(),
  students: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      rollNo: z.string(),
    })
  ),
})

export const bulkPromoteResultSchema = z.object({
  message: z.string(),
  results: z.object({
    success: z.array(
      z.object({
        studentId: z.string(),
        name: z.string(),
        rollNo: z.string(),
        oldSemester: z.number(),
        newSemester: z.number(),
        isGraduated: z.boolean().optional(),
        feeId: z.string().optional(),
        message: z.string().optional(),
      })
    ),
    failed: z.array(
      z.object({
        studentId: z.string(),
        name: z.string().optional(),
        rollNo: z.string().optional(),
        error: z.string(),
      })
    ),
    total: z.number(),
  }),
})

export type BulkImportResult = z.infer<typeof bulkImportResultSchema>
export type BulkDeleteResult = z.infer<typeof bulkDeleteResultSchema>
export type BulkPromoteResult = z.infer<typeof bulkPromoteResultSchema>
