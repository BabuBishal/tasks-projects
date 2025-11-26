import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentStats = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.paymentStats}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Payments");
  }

  return res.json();
};

export const useGetPaymentStats = () => {
  return useQuery({
    queryKey: [API_ROUTES.paymentStats],
    queryFn: () => getPaymentStats(),
  });
};
