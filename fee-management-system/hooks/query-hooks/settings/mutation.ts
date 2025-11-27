import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/config/api-routes";
import { updateSettings } from "@/lib/api/services/settings/settings";

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.settings] });
    },
  });
};
