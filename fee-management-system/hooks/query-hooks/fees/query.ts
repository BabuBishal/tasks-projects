import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getFeeStructures } from "../../../lib/api/services/fees/fees";
import { FeeStructureResponse } from "../../../lib/types/api";

export const useGetFeeStructuresQuery = () => {
  return useQuery<FeeStructureResponse[]>({
    queryKey: [API_ROUTES.feeStructures],
    queryFn: () => getFeeStructures(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
