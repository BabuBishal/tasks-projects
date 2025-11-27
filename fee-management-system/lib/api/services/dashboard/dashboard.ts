import { API_ROUTES } from "../../../config/api-routes";
import httpClient from "../../api";
import { DashboardData } from "../../../types/api";

export const getDashboardStats = async () => {
  const response = await httpClient.get<DashboardData>(
    API_ROUTES.dashboardStats
  );

  return response;
};
