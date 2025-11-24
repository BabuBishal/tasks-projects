"use client";
import useForm from "@/hooks/useForm";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/lib/validator";
import { registerSchema } from "@/lib/constants";
import RegisterForm from "@/components/forms/RegisterForm";
import { useToast } from "@/components/ui/toast";
import { RegisterFormInputs } from "@/lib/@types";
import {
  loginUser,
  useRegister,
} from "@/lib/services/mutations/useAuthMutation";

const RegisterPage = () => {
  const router = useRouter();
  const { locale } = useParams() as { locale: string };
  const { notify } = useToast();

  const { mutate: register, isPending, error } = useRegister();

  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<RegisterFormInputs>({
      initialValues: { name: "", email: "", password: "" },
      validateForm,
      schema: registerSchema,
    });

  const onSubmit = (data: RegisterFormInputs) => {
    register(data, {
      onSuccess: async () => {
        notify({
          title: "Registration Successful",
          description: "Registration Successful.",
          type: "success",
        });

        // Auto-login after registration
        try {
          await loginUser({
            email: data.email,
            password: data.password,
          });
          router.push(`/${locale}/dashboard`);
        } catch (error) {
          console.error("Auto-login failed:", error);
          // Redirect to login page if auto-login fails
          router.push(`/${locale}/login`);
        }
      },
      onError: (error) => {
        notify({
          title: "Registration Error",
          description: error.message,
          type: "error",
        });
      },
    });
  };

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-5 justify-center items-center p-20 w-screen h-screen">
      <div className="text-2xl text-primary font-bold">Fee Payment System</div>
      <RegisterForm
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

export default RegisterPage;
