import { API_ROUTES } from '@/lib/api/api-routes'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '@/app/[locale]/(root)/dashboard/_api/dashboard'
import { DashboardData } from '@/lib/types/api'

export const useGetDashboardStatsQuery = () => {
  return useQuery<DashboardData>({
    queryKey: [API_ROUTES.dashboardStats],
    queryFn: () => getDashboardStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: (previousData: DashboardData | undefined) => previousData,
  })
}
