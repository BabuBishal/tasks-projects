import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getPaymentReportStats } from '../_api/reports'

export const useGetPaymentReportStatsQuery = (params?: {
  startDate?: string
  endDate?: string
}) => {
  return useQuery({
    queryKey: [API_ROUTES.reports.paymentStats, params],
    queryFn: () => getPaymentReportStats(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: previousData => previousData,
  })
}
