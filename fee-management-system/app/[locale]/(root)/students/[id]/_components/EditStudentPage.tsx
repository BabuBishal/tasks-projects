"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useForm from "@/hooks/useForm";

import { Program, Scholarship } from "@/lib/types/prisma";
import { studentSchema } from "@/lib/constants/constants";
import { validateForm } from "@/lib/validator";
import { StudentFormInputs } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import StudentForm from "../../../../../../components/forms/StudentForm";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function EditStudentPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [studentLoading, setStudentLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;
  const { notify } = useToast();

  const { formData, formErrors, handleChange, handleSubmit, setFormData } =
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

  // Fetch student data
  useEffect(() => {
    async function fetchStudent() {
      try {
        setStudentLoading(true);
        const res = await fetch(`${baseUrl}/api/students/${studentId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch student data");
        }

        const studentData = await res.json();

        // Populate form with student data
        setFormData({
          name: studentData.name || "",
          email: studentData.email || "",
          programId: studentData.programId || "",
          semester: studentData.semester || 1,
          phone: studentData.phone || "",
          address: studentData.address || "",
          scholarshipId: studentData.scholarships?.[0]?.scholarshipId || "",
        });

        setStudentLoading(false);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student data.");
        setStudentLoading(false);
        notify({
          title: "Error",
          description: "Failed to load student data.",
          type: "error",
        });
      }
    }

    if (studentId) {
      fetchStudent();
    }
  }, [studentId, notify, setFormData]);

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
      const res = await fetch(`${baseUrl}/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        const errorMsg =
          responseData.details ||
          responseData.error ||
          "Failed to update student";
        console.error("API Error:", errorMsg);
        // notify({
        //   title: "Update Failed",
        //   description: errorMsg,
        //   type: "error",
        // });
        router.back();
        throw new Error(errorMsg);
      }

      setError("");
      setLoading(false);
      notify({
        title: "Updated Successfully",
        description: "Student updated successfully.",
        type: "success",
      });
      router.back();

      // router.push(`/students/${studentId}`);
    } catch (err: unknown) {
      console.error("Error:", err);
      setError(
        (err as Error).message || "Something went wrong while updating student."
      );
      setLoading(false);
      notify({
        title: "Update Failed",
        description: error || "Error updating student.",
        type: "error",
      });
    }
  };

  if (studentLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-5 justify-center items-center mx-auto mt-10">
      <h2 className="text-2xl font-semibold">Edit Student</h2>
      <StudentForm
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
