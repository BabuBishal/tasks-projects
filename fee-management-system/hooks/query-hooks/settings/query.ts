import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/config/api-routes";
import { getSettings } from "@/lib/services/settings/settings";

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.settings],
    queryFn: getSettings,
  }); 
};
