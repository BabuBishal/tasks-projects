import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSettings = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.settings}`);
  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }
  return res.json();
};

export const useSettings = () => {
  return useQuery({
    queryKey: [API_ROUTES.settings],
    queryFn: getSettings,
  });
};
