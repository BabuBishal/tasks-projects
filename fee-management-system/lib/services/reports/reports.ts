import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentReportStats = async (params?: {
  startDate?: string;
  endDate?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);

  const url = `${baseUrl}${API_ROUTES.reports.paymentStats}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch payment report stats");
  }
  return res.json();
};
