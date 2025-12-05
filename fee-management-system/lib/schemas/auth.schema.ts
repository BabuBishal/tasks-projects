import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Valid email required' }).min(1, 'Email is required'),
  password: z
    .string({ message: 'Password is required' })
    .min(1, 'Password is required')
    .min(4, 'Password must be at least 4 characters'),
})

export const registerSchema = z.object({
  name: z.string({ message: 'Name is required' }).min(1, 'Name is required'),
  email: z.email({ message: 'Valid email required' }).min(1, 'Email is required'),
  password: z
    .string({ message: 'Password is required' })
    .min(1, 'Password is required')
    .min(4, 'Password must be at least 4 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export const registerResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  message: z.string().optional(),
})

export const loginResponseSchema = z.object({
  ok: z.boolean().optional(),
  error: z.string().nullable().optional(),
  status: z.number().optional(),
  url: z.string().nullable().optional(),
})

export type RegisterResponse = z.infer<typeof registerResponseSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
