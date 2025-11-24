"use client";
import LoginForm from "@/components/forms/LoginForm";
import useForm from "@/hooks/useForm";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/lib/validator";
import { loginSchema } from "@/lib/constants";
import { LoginFormInputs } from "@/lib/@types";
import { useToast } from "@/components/ui/toast";
import { useLogin } from "@/lib/services/mutations/useAuthMutation";

const LoginPage = () => {
  const router = useRouter();
  const { locale } = useParams() as { locale: string };
  const { notify } = useToast();

  const { mutate: login, isPending, error } = useLogin();

  const { formData, formErrors, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "" },
    validateForm,
    schema: loginSchema,
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data, {
      onSuccess: () => {
        notify({
          title: "Success",
          description: "Login Successful",
          type: "success",
        });
        router.push(`/${locale}/dashboard`);
      },
      onError: (error: Error) => {
        notify({
          title: "Login Error",
          description: error.message,
          type: "error",
        });
      },
    });
  };

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-5 justify-center items-center p-20 w-screen h-screen">
      <div className="text-2xl text-primary font-bold">Fee Payment System</div>
      <LoginForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        formErrors={formErrors}
        error={error?.message || ""}
        isLoading={isPending}
      />
    </div>
  );
};

export default LoginPage;
