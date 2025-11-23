"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddStudentForm from "@/components/forms/StudentForm";
import useForm from "@/hooks/useForm";
import { Program, Scholarship } from "@/lib/@types/prisma";
import { studentSchema } from "@/lib/constants";
import { validateForm } from "@/lib/validator";
import { StudentFormInputs } from "@/lib/@types";
import { useToast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddStudentPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const router = useRouter();
  const { notify } = useToast();

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
        notify({
          title: "Adding Failed",
          description: "Failed to add student.",
          type: "error",
        });
        router.back();
        throw new Error(errorMsg);
      }

      setError("");
      setLoading(false);
      notify({
        title: "Added Successfully",
        description: "New student added successfully.",
        type: "success",
      });
      router.back();

      // router.push("/students");
    } catch (err: unknown) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while adding student."
      );
      setLoading(false);
      notify({
        title: "Adding Failed",
        description: "Error adding new successfully.",
        type: "error",
      });
    }
  };

  // console.log("first", scholarships);
  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <Breadcrumb
        items={[
          { label: "Students", href: "/students" },
          { label: "Add Student", href: "/students/add" },
        ]}
      />
      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl font-semibold">Add Student</h2>
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
    </div>
  );
}
