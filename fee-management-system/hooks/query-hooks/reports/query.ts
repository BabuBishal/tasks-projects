import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getPaymentReportStats } from "../../../lib/api/services/reports/reports";

export const useGetPaymentReportStatsQuery = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: [API_ROUTES.reports.paymentStats, params],
    queryFn: () => getPaymentReportStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes (reports need fresher data)
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
