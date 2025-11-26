import { useQuery } from "@tanstack/react-query";
import { UserWithProfile } from "@/lib/types";
import { API_ROUTES } from "@/lib/config/api-routes";
import { getProfile } from "@/lib/services/profile/profile";

export const useProfileQuery = () => {
  return useQuery<UserWithProfile>({
    queryKey: [API_ROUTES.profile],
    queryFn: getProfile,
  });
};
