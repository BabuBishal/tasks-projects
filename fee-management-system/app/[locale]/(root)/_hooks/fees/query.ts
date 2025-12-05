import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getFeeStructures, getOverdueFees } from '../../_api/fees'
import { FeeStructureResponse, OverdueFee } from '../../../../../lib/types/api'

export const useGetFeeStructuresQuery = () => {
  return useQuery<FeeStructureResponse[]>({
    queryKey: [API_ROUTES.feeStructures],
    queryFn: () => getFeeStructures(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData: FeeStructureResponse[] | undefined) => previousData,
  })
}

export const useGetOverdueFeesQuery = () => {
  return useQuery<OverdueFee[]>({
    queryKey: [API_ROUTES.overdueFees],
    queryFn: () => getOverdueFees(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData: OverdueFee[] | undefined) => previousData,
  })
}
