import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/config/api-routes";
import { getSettings } from "@/lib/api/services/settings/settings";

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.settings],
    queryFn: getSettings,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
