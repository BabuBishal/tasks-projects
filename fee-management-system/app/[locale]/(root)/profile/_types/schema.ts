import { z } from 'zod'

export const userProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  profilePicture: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  profile: userProfileSchema.nullable().optional(),
})

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email(),
  phone: z.string().optional(),
  position: z.string().optional(),
})

export type UserProfile = z.infer<typeof userProfileSchema>
export type UserWithProfile = z.infer<typeof userSchema>
export type ProfileUpdateInput = z.infer<typeof updateProfileSchema>

export type ProfileResponse = UserWithProfile
export type UpdateProfileResponse = UserWithProfile
