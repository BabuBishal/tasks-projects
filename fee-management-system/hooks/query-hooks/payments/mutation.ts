import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import { addPayment } from "@/lib/services/payments/payments";


export const useAddPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPayment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students, variables.studentId],
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentHistory] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
    },
  });
};