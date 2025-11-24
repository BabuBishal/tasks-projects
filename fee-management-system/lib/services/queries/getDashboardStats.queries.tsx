import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDashboardStats = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.dashboardStats}`, {
    next: { revalidate: 90 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
};

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: [API_ROUTES.dashboardStats],
    queryFn: () => getDashboardStats(),
  });
};
