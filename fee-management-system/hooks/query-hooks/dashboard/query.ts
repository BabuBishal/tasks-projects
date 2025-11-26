import { API_ROUTES } from "@/lib/config/api-routes";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/services/dashboard/dashboard";

export const useGetDashboardStatsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.dashboardStats],
    queryFn: () => getDashboardStats(),
  });
};
