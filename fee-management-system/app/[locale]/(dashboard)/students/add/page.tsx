"use client";

import AddStudentForm from "@/components/forms/AddStudentForm";
import useForm from "@/hooks/useForm";
import { StudentFormInputs } from "@/lib/@types/types";
import { studentSchema } from "@/lib/constants";
import { validateForm } from "@/lib/validator";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddStudentPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<StudentFormInputs>({
      initialValues: {
        name: "",
        email: "",
        rollNo: "",
        program: "BBA",
        semester: 1,
        phone: "",
        address: "",
      },
      validateForm,
      schema: studentSchema,
    });

  const onSubmit = async (data: StudentFormInputs) => {
    try {
      const res = await fetch(`${baseUrl}/api/students/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
        }),
      });
      // console.log(data);
      if (!res.ok) {
        throw new Error("Failed to create student");
      }
      router.push("/students");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding student.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      <AddStudentForm
        onSubmit={onSubmit}
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={error}
      />
    </div>
  );
}
