import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateSettings = async (data: unknown) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.settings}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update settings");
  }

  return res.json();
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.settings] });
    },
  });
};
