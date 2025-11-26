import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getPaymentReportStats } from "../../../lib/services/reports/reports";

export const useGetPaymentReportStatsQuery = (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: [API_ROUTES.reports.paymentStats, params],
    queryFn: () => getPaymentReportStats(params),
  });
};
