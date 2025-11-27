import { loginUser, registerUser } from "@/lib/api/services/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // You can invalidate user-related queries here if needed
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Invalidate any user-related queries
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: Error) => {
      console.error("Registration error:", error.message);
    },
  });
};
