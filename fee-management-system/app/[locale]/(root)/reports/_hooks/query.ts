import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getPaymentReportStats } from '../_api/reports'
import { PaymentStats } from '../_types'

export const useGetPaymentReportStatsQuery = (params?: {
  startDate?: string
  endDate?: string
}) => {
  return useQuery<PaymentStats>({
    queryKey: [API_ROUTES.reports.paymentStats, params],
    queryFn: () => getPaymentReportStats(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData: PaymentStats | undefined) => previousData,
  })
}
