import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileUpdateInput, PasswordChangeInput } from "@/lib/@types";
import { API_ROUTES } from "@/lib/api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateProfile = async (data: ProfileUpdateInput) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.profile}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update profile");
  }

  return res.json();
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.profile] });
    },
  });
};

export const changePassword = async (data: PasswordChangeInput) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.profile}/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to change password");
  }

  return res.json();
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${baseUrl}${API_ROUTES.profile}/photo`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to upload photo");
  }

  return res.json();
};

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.profile] });
    },
  });
};
