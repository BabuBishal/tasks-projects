"use client";

import useForm from "@/hooks/useForm";
import { PaymentFormInputs, Student } from "@/lib/@types/types";
import { paymentSchema } from "@/lib/constants";
import { validateForm } from "@/lib/validator";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import PaymentForm from "@/components/forms/PaymentForm";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddPaymentPage() {
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const router = useRouter();
  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<PaymentFormInputs>({
      initialValues: {
        id: "",
        amount: "",
        method: "Cash",
      },
      validateForm,
      schema: paymentSchema,
    });

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:3000/api/students");
    const students = await res.json();
    setStudents(students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onSubmit = async (data: PaymentFormInputs) => {
    console.log(data);
    try {
      const res = await fetch(`${baseUrl}/api/payment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to add payment");
      }
      router.push("/payments");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding payment.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      <PaymentForm
        onSubmit={onSubmit}
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={error}
        students={students}
      />
    </div>
  );
}
