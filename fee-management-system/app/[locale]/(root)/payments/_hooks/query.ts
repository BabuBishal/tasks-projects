import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import { getPayments, getPaymentStats } from '@/app/[locale]/(root)/payments/_api/payments'
import { PaymentsResponse, PaymentStatsResponse } from '@/lib/types/api'

export type PaymentQueryParams = {
  page?: number
  limit?: number
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

export const useGetInfinitePaymentsQuery = ({ params = {} }: { params?: PaymentQueryParams }) => {
  return useInfiniteQuery<PaymentsResponse>({
    queryKey: [API_ROUTES.payments, params],
    queryFn: ({ pageParam = 1 }) =>
      getPayments({ params: { ...params, page: pageParam as number } }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage?.meta || {}
      return page && page < totalPages ? page + 1 : undefined
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
