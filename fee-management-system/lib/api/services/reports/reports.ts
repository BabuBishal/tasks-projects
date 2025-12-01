import { API_ROUTES } from '@/lib/api/config/api-routes'
import httpClient from '../../api'

export const getPaymentReportStats = async (params?: { startDate?: string; endDate?: string }) => {
  return await httpClient.get(API_ROUTES.reports.paymentStats, { params })
}
