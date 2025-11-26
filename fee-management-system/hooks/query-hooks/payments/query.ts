import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { getPayments, getPaymentStats } from "@/lib/services/payments/payments";

export const useGetPaymentsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.payments],
    queryFn: () => getPayments(),
  });
};

export const useGetPaymentStatsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.paymentStats],
    queryFn: () => getPaymentStats(),
  });
};
