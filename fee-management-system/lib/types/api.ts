// Re-exporting types from modules
export * from '@/app/[locale]/(root)/students/_types'
export * from '@/app/[locale]/(root)/programs/_types'
export * from '@/app/[locale]/(root)/payments/_types'
export * from '@/app/[locale]/(root)/settings/_types'
export * from '@/app/[locale]/(root)/profile/_types'
export * from '@/app/[locale]/(root)/dashboard/_types/schema'
export * from '@/app/[locale]/(root)/reports/_types/schema'
export * from '@/lib/schemas/auth.schema'

// Generic API response wrapper
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Error response
export type ApiError = {
  error: string
  details?: Record<string, unknown>
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
