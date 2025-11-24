import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Create fee structure mutation function
export const createFeeStructure = async (data: unknown) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructures}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create fee structure");
  }

  return res.json();
};

// Update fee structure mutation function
export const updateFeeStructure = async ({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructureWithId(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update fee structure");
  }

  return res.json();
};

// Delete fee structure mutation function
export const deleteFeeStructure = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructureWithId(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete fee structure");
  }

  return res.json();
};

// Hook to use create fee structure mutation
export const useCreateFeeStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.feeStructures],
      });
    },
    onError: (error: Error) => {
      console.error("Create fee structure error:", error.message);
    },
  });
};

// Hook to use update fee structure mutation
export const useUpdateFeeStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeeStructure,
    onSuccess: (data, variables) => {
      // Invalidate specific fee structure query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.feeStructures, variables.id],
      });

      // Invalidate fee structures list query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.feeStructures],
      });
    },
    onError: (error: Error) => {
      console.error("Update fee structure error:", error.message);
    },
  });
};

// Hook to use delete fee structure mutation
export const useDeleteFeeStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.feeStructures],
      });
    },
    onError: (error: Error) => {
      console.error("Delete fee structure error:", error.message);
    },
  });
};
