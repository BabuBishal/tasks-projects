import { useQuery } from "@tanstack/react-query";
import { UserWithProfile } from "@/lib/@types";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { API_ROUTES } from "@/lib/api-routes";

export const getProfile = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.profile}`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
};

export const useProfile = () => {
  return useQuery<UserWithProfile>({
    queryKey: [API_ROUTES.profile],
    queryFn: getProfile,
  });
};
