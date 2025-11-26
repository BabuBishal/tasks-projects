import { API_ROUTES } from "../../config/api-routes";
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