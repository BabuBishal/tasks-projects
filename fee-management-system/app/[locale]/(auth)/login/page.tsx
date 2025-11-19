"use client";
import LoginForm from "@/components/forms/LoginForm";
import useForm from "@/hooks/useForm";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/lib/validator";
import { loginSchema } from "@/lib/constants";
import { signIn } from "next-auth/react";
import { LoginFormInputs } from "@/lib/@types/types";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
const LoginPage = () => {
  const router = useRouter();
  const { locale } = useParams() as { locale: string };

  const [error, setError] = useState("");
  const { notify } = useToast();

  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<LoginFormInputs>({
      initialValues: { email: "", password: "" },
      validateForm,
      schema: loginSchema,
    });

  const onSubmit = async (data: LoginFormInputs) => {
    // console.log(data);
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.log("Login failed:", result.error);
        setError(`Login failed: ${result.error}`);
        notify({
          title: "Error",
          description: `Login failed: ${result.error}`,
          type: "error",
        });
        return;
      }
      notify({
        title: "Success",
        description: `Login Successful`,
        type: "success",
      });

      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error("Error:", err);
      setError(`Error: ${err}`);
      notify({
        title: "Login Error",
        description: `Error: ${err}`,
        type: "error",
      });
    }
  };
  return (
    <div className="absolute top-0 left-0 flex  flex-col gap-5 justify-center items-center p-20 w-screen h-screen">
      <div className="text-2xl text-primary font-bold">Fee Payment system</div>

      <LoginForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        formErrors={formErrors}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
