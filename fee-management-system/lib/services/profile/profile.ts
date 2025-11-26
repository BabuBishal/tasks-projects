import { API_ROUTES } from "@/lib/config/api-routes";
import { PasswordChangeInput, ProfileUpdateInput } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProfile = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.profile}`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
};


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


export const changePassword = async (data: PasswordChangeInput) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.profilePassword}`, {
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

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${baseUrl}${API_ROUTES.profilePhoto}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to upload photo");
  }

  return res.json();
};