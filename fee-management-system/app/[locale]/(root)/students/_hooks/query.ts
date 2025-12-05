import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getStudents, getStudentById } from '../_api/students'
import { PaginatedResponse, StudentResponse } from '@/lib/types/api'

export const useGetStudentsQuery = (params?: {
  search?: string
  programId?: string
  semester?: string
  status?: string
  page?: number
  limit?: number
}) => {
  return useQuery<PaginatedResponse<StudentResponse>>({
    queryKey: [API_ROUTES.students, params],
    queryFn: () => getStudents(params),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: previousData => previousData,
  })
}

export const useGetStudentByIdQuery = (id: string) => {
  return useQuery<StudentResponse>({
    queryKey: [API_ROUTES.students, id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: previousData => previousData,
  })
}
