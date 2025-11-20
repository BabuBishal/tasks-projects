import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPayments = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.payments}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Payments");
  }

  return res.json();
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: [API_ROUTES.payments],
    queryFn: () => getPayments(),
  });
};
