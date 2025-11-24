import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Add payment mutation function
export const addPayment = async (data: {
  studentId: string;
  amount: number;
  method: string;
  selectedFeeIds: string[];
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.paymentAdd}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add payment");
  }

  return res.json();
};

// Hook to use add payment mutation
export const useAddPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPayment,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.payments],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.dashboardStats],
      });
    },
    onError: (error: Error) => {
      console.error("Add payment error:", error.message);
    },
  });
};
