import { API_ROUTES } from "@/lib/config/api-routes";
import httpClient from "../../api";

export const getSettings = async () => {
  return await httpClient.get(API_ROUTES.settings);
};

export const updateSettings = async (data: unknown) => {
  return await httpClient.put(API_ROUTES.settings, data);
};
