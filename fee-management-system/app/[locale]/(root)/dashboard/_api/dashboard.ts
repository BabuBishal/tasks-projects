import { API_ROUTES } from '../../../../../lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'
import { DashboardData } from '../../../../../lib/types/api'

export const getDashboardStats = async () => {
  const response = await httpClient.get<DashboardData>(API_ROUTES.dashboardStats)

  return response
}
