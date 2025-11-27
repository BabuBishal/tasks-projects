import { API_ROUTES } from "@/lib/config/api-routes";
import { PasswordChangeInput, ProfileUpdateInput } from "@/lib/types";
import httpClient from "../../api";

export const getProfile = async () => {
  return await httpClient.get(API_ROUTES.profile);
};

export const updateProfile = async (data: ProfileUpdateInput) => {
  return await httpClient.put(API_ROUTES.profile, data);
};

export const changePassword = async (data: PasswordChangeInput) => {
  return await httpClient.put(API_ROUTES.profilePassword, data);
};

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  return await httpClient.post(API_ROUTES.profilePhoto, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
