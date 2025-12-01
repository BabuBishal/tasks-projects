import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../lib/api/config/api-routes'
import { addPayment } from '@/lib/api/services/payments/payments'
import { AddPaymentRequest, AddPaymentResponse } from '@/lib/types/api'

export const useAddPaymentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<AddPaymentResponse, Error, AddPaymentRequest>({
    mutationFn: addPayment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students, variables.studentId],
      })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.reports.paymentStats] })
    },
  })
}
