import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/config/api-routes";
import {
  changePassword,
  updateProfile,
  uploadProfilePhoto,
} from "@/lib/api/services/profile/profile";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.profile] });
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useUploadProfilePhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.profile] });
    },
  });
};
