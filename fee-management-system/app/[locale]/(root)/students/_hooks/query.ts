import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getStudents, getStudentById, StudentQueryParams } from '../_api/students'
import { PaginatedResponse, StudentResponse } from '@/lib/types/api'

export const useGetStudentsQuery = ({ params = {} }: { params?: StudentQueryParams }) => {
  return useQuery<PaginatedResponse<StudentResponse>>({
    queryKey: [API_ROUTES.students, params],
    queryFn: () => getStudents({ params }),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData: PaginatedResponse<StudentResponse> | undefined) => previousData,
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
    placeholderData: (previousData: StudentResponse | undefined) => previousData,
  })
}

export default function getInfiniteStudentsQueryOptions({
  params,
}: {
  params: StudentQueryParams
}) {
  return {
    queryKey: [API_ROUTES.students, params],
    queryFn: ({ pageParam = 1 }) => getStudents({ params: { ...params, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<StudentResponse>) => {
      const { page, totalPages } = lastPage?.meta || {}
      return page && page < totalPages ? page + 1 : undefined
    },
    getPreviousPageParam: (firstPage: PaginatedResponse<StudentResponse>) => {
      return firstPage.meta.page > 1 ? firstPage.meta.page - 1 : undefined
    },
    staleTime: 15 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  }
}
