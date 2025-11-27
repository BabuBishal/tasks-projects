"use client";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/lib/validator";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/schemas/auth.schema";
import RegisterForm from "@/components/forms/RegisterForm";
import { useToast } from "@/components/ui/toast";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/hooks/query-hooks/auth/mutation";
import { loginUser } from "@/lib/api/services/auth/auth";
import { RegisterFormInputs } from "@/lib/types";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const router = useRouter();
  const { locale } = useParams() as { locale: string };
  const { notify } = useToast();

  const { mutate: registerUser, isPending, error } = useRegisterMutation();

  // const { formData, formErrors, handleChange, handleSubmit } =
  //   useForm<RegisterFormInputs>({
  //     initialValues: { name: "", email: "", password: "" },
  //     validateForm,
  //     schema: registerSchema,
  //   });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: async () => {
        notify({
          title: "Success",
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
          notify({
            title: "Redirect Error",
            description: "Auto-login failed.",
            type: "error",
          });
          // Redirect to login page if auto-login fails
          router.push(`/${locale}/login`);
        }
      },
      onError: (error: Error) => {
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
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        error={error?.message || ""}
        isLoading={isPending}
      />
    </div>
  );
};

export default RegisterPage;
