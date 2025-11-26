import { API_ROUTES } from "@/lib/config/api-routes";
import { LoginFormData, RegisterFormData } from "@/lib/schemas/auth.schema";
import { signIn } from "next-auth/react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const loginUser = async (data: LoginFormData) => {
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

export const registerUser = async (data: RegisterFormData) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.auth.register}`, {
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
