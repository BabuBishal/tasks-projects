import { API_ROUTES } from "@/lib/config/api-routes";
import httpClient from "../../api";
import { Scholarship } from "@/lib/types/prisma";

export const getScholarships = async (): Promise<Scholarship[]> => {
  return await httpClient.get<Scholarship[]>(API_ROUTES.scholarships);
};
