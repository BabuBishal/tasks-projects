import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import {
  getPayments,
  getPaymentStats,
} from "@/lib/api/services/payments/payments";
import { PaymentsResponse, PaymentStatsResponse } from "@/lib/types/api";

export type PaymentQueryParams = {
  page?: number;
  search?: string;
  status?: string;
  method?: string;
};

export const useGetPaymentsQuery = ({
  params = {},
}: {
  params?: PaymentQueryParams;
}) => {
  return useQuery<PaymentsResponse>({
    queryKey: [API_ROUTES.payments, params],
    queryFn: () => getPayments({ params }),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useGetPaymentStatsQuery = () => {
  return useQuery<PaymentStatsResponse>({
    queryKey: [API_ROUTES.paymentStats],
    queryFn: () => getPaymentStats(),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
