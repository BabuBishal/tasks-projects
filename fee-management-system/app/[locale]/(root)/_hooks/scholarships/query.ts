import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getScholarships } from '../../_api/scholarships'
import { Scholarship } from '@/lib/types/prisma'

export const useGetScholarshipsQuery = () => {
  return useQuery<Scholarship[]>({
    queryKey: [API_ROUTES.scholarships],
    queryFn: () => getScholarships(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}
