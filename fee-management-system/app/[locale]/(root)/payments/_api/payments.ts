import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'
import {
  PaymentsResponse,
  PaymentStatsResponse,
  AddPaymentRequest,
  AddPaymentResponse,
} from '@/lib/types/api'
import { PaymentQueryParams } from '@/app/[locale]/(root)/payments/_hooks'

export const getPayments = async ({
  params,
}: {
  params: PaymentQueryParams
}): Promise<PaymentsResponse> => {
  return await httpClient.get<PaymentsResponse>(API_ROUTES.payments, {
    params,
  })
}

export const getPaymentStats = async (): Promise<PaymentStatsResponse> => {
  return await httpClient.get<PaymentStatsResponse>(API_ROUTES.paymentStats)
}

export const addPayment = async (data: AddPaymentRequest): Promise<AddPaymentResponse> => {
  return await httpClient.post<AddPaymentResponse>(API_ROUTES.paymentAdd, data)
}

// export const getPaymentsInfinite = async ({
//   params,
// }: {
//   params: PaymentQueryParams
// }): Promise<PaymentsResponse> => {
//   return await httpClient.get<PaymentsResponse>(API_ROUTES.payments, {
//     params,
//   })
// }
