import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getPayments, getPaymentStats } from '@/app/[locale]/(root)/payments/_api/payments'
import { PaymentsResponse, PaymentStatsResponse } from '@/lib/types/api'

export type PaymentQueryParams = {
  page?: number
  search?: string
  status?: string
  method?: string
}

export const useGetPaymentsQuery = ({ params = {} }: { params?: PaymentQueryParams }) => {
  return useQuery<PaymentsResponse>({
    queryKey: [API_ROUTES.payments, params],
    queryFn: () => getPayments({ params }),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: previousData => previousData,
  })
}

export const useGetPaymentStatsQuery = () => {
  return useQuery<PaymentStatsResponse>({
    queryKey: [API_ROUTES.paymentStats],
    queryFn: () => getPaymentStats(),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
