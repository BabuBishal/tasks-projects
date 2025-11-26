import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getScholarships } from "../../../lib/services/scholarships/scholarships";

export const useGetScholarshipsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.scholarships],
    queryFn: () => getScholarships(),
  });
};
