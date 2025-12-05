import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'
import { PaymentStats } from '../_types'

export const getPaymentReportStats = async (params?: {
  startDate?: string
  endDate?: string
}): Promise<PaymentStats> => {
  return await httpClient.get<PaymentStats>(API_ROUTES.reports.paymentStats, { params })
}
