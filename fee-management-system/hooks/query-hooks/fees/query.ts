import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getFeeStructures } from "../../../lib/services/fees/fees";

export const useGetFeeStructuresQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.feeStructures],
    queryFn: () => getFeeStructures(),
  });
};
