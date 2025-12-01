import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../lib/api/config/api-routes'
import { getPrograms, getProgramsById } from '../../../lib/api/services/programs/programs'
import { Program } from '@/lib/types/prisma'

export const useGetProgramsQuery = () => {
  return useQuery<Program[]>({
    queryKey: [API_ROUTES.programs],
    queryFn: () => getPrograms(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useGetProgramQuery = (id: string) => {
  return useQuery<Program>({
    queryKey: [API_ROUTES.programs, id],
    queryFn: () => getProgramsById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
