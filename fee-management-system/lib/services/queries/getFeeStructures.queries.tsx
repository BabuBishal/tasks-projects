import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFeeStructures = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructures}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch fee structures");
  }

  return res.json();
};

export const useGetFeeStructures = () => {
  return useQuery({
    queryKey: [API_ROUTES.feeStructures],
    queryFn: () => getFeeStructures(),
  });
};
