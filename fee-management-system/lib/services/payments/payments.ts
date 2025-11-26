import { API_ROUTES } from "../../config/api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPayments = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.payments}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Payments");
  }

  return res.json();
};

export const getPaymentStats = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.paymentStats}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Payments");
  }

  return res.json();
};

export const addPayment = async (data: {
  studentId: string;
  amount: number;
  method: string;
  selectedFeeIds: string[];
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.paymentAdd}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add payment");
  }

  return res.json();
};
