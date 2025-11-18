"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddStudentForm from "@/components/forms/AddStudentForm";
import useForm from "@/hooks/useForm";
import { Program, Scholarship } from "@/lib/@types/prisma";
import { studentSchema } from "@/lib/constants";
import { validateForm } from "@/lib/validator";
import { StudentFormInputs } from "@/lib/@types/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddStudentPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const router = useRouter();

  const { formData, formErrors, handleChange, handleSubmit } =
    useForm<StudentFormInputs>({
      initialValues: {
        name: "",
        email: "",
        programId: "",
        semester: 1,
        phone: "",
        address: "",
        scholarshipId: "",
      },
      validateForm,
      schema: studentSchema,
    });

  // Fetch programs and scholarships from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [programRes, scholarshipRes] = await Promise.all([
          fetch(`${baseUrl}/api/programs`),
          fetch(`${baseUrl}/api/scholarships`),
        ]);

        const programData = await programRes.json();
        const scholarshipData = await scholarshipRes.json();

        setPrograms(programData);
        setScholarships(scholarshipData);
        setLoading(false);

        // // Set first program as default
        // if (programData.length > 0) {
        //   formData.programId = programData[0].id;
        // }
      } catch (err) {
        console.error("Fetching failed:", err);
        setError("Failed to load required data.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const onSubmit = async (data: StudentFormInputs) => {
    console.log("sending data to api", data);
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        const errorMsg =
          responseData.details ||
          responseData.error ||
          "Failed to create student";
        console.error("API Error:", errorMsg);
        throw new Error(errorMsg);
      }

      setError("");
      setLoading(false);
      router.push("/students");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong while adding student.");
      setLoading(false);
    }
  };

  console.log("first", scholarships);
  return (
    <div className=" w-full max-w-xl mx-auto mt-10">
      <AddStudentForm
        programs={programs}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
        scholarships={scholarships}
        loading={loading}
      />
    </div>
  );
}
