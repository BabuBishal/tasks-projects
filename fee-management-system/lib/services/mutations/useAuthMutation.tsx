import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { LoginFormInputs, RegisterFormInputs } from "@/lib/@types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const loginUser = async (data: LoginFormInputs) => {
  const result = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
};

export const registerUser = async (data: RegisterFormInputs) => {
  const res = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to register user");
  }

  return res.json();
};

export const useLogin = () => {
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

export const useRegister = () => {
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
