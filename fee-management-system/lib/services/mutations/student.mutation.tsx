import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Update student mutation function
export const updateStudent = async ({ 
  id, 
  data 
}: { 
  id: string; 
  data: any 
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.students}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update student");
  }

  return res.json();
};

// Hook to use update student mutation
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data, variables) => {
      // Invalidate specific student query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students, variables.id],
      });
      
      // Invalidate students list query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students],
      });
    },
    onError: (error: Error) => {
      console.error("Update student error:", error.message);
    },
  });
};