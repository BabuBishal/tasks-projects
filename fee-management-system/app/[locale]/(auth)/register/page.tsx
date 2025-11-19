"use client";
import useForm from "@/hooks/useForm";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/lib/validator";
import { registerSchema } from "@/lib/constants";
import { FormInputs } from "@/lib/@types/types";
import RegisterForm from "@/components/forms/RegisterForm";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/toast";

const RegisterPage = () => {
  const router = useRouter();
  const { locale } = useParams() as { locale: string };
  const [error, setError] = useState("");
  const { notify } = useToast();

  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<FormInputs>({
      initialValues: { name: "", email: "", password: "" },
      validateForm,
      schema: registerSchema,
    });

  const onSubmit = async (form_data: FormInputs) => {
    // console.log(data);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: new Date(),
          name: form_data.name,
          email: form_data.email,
          password: form_data.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        notify({
          title: "Registration Error",
          description: `Error: ${data.error}`,
          type: "error",
        });
      } else {
        notify({
          title: "Registration Successful",
          description: `Registration Successful.`,
          type: "success",
        });

        await signIn("credentials", {
          redirect: false,
          email: form_data.email,
          password: form_data.password,
        });
        router.push(`/${locale}/dashboard`);
      }
    } catch (err) {
      console.error("Error:", err);
      notify({ title: "Error", description: `Error: ${err}`, type: "error" });
    }
  };
  return (
    <div className="absolute top-0 left-0 flex  flex-col gap-5 justify-center items-center p-20 w-screen h-screen">
      <div className="text-2xl text-primary font-bold">Fee Payment system</div>

      <RegisterForm
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

export default RegisterPage;
