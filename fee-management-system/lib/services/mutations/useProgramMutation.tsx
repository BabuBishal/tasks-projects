import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Create program mutation function
export const createProgram = async (data: {
  name: string;
  duration: number;
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programs}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create program");
  }

  return res.json();
};

// Update program mutation function
export const updateProgram = async ({
  id,
  data,
}: {
  id: string;
  data: { name: string; duration: number };
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programWithId(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update program");
  }

  return res.json();
};

// Delete program mutation function
export const deleteProgram = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programWithId(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete program");
  }

  return res.json();
};

// Hook to use create program mutation
export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.programs],
      });
    },
    onError: (error: Error) => {
      console.error("Create program error:", error.message);
    },
  });
};

// Hook to use update program mutation
export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgram,
    onSuccess: (data, variables) => {
      // Invalidate specific program query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.programs, variables.id],
      });

      // Invalidate programs list query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.programs],
      });
    },
    onError: (error: Error) => {
      console.error("Update program error:", error.message);
    },
  });
};

// Hook to use delete program mutation
export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.programs],
      });
    },
    onError: (error: Error) => {
      console.error("Delete program error:", error.message);
    },
  });
};
