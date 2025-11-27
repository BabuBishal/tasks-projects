import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import {
  createFeeStructure,
  deleteFeeStructure,
  updateFeeStructure,
} from "../../../lib/api/services/fees/fees";

export const useCreateFeeStructureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.feeStructures] });

      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
    },
  });
};

export const useUpdateFeeStructureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeeStructure,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.feeStructures, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.feeStructures] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
    },
  });
};

export const useDeleteFeeStructureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.feeStructures] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
    },
  });
};
