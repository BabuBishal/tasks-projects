import { API_ROUTES } from "@/lib/config/api-routes";
import httpClient from "../../api";
import {
  PaymentsResponse,
  PaymentStatsResponse,
  AddPaymentRequest,
  AddPaymentResponse,
} from "@/lib/types/api";

export const getPayments = async (): Promise<PaymentsResponse> => {
  return await httpClient.get<PaymentsResponse>(API_ROUTES.payments);
};

export const getPaymentStats = async (): Promise<PaymentStatsResponse> => {
  return await httpClient.get<PaymentStatsResponse>(API_ROUTES.paymentStats);
};

export const addPayment = async (
  data: AddPaymentRequest
): Promise<AddPaymentResponse> => {
  return await httpClient.post<AddPaymentResponse>(API_ROUTES.paymentAdd, data);
};
