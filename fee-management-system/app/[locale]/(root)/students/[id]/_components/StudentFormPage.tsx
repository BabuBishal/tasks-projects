"use client";
import AddStudentForm from "@/components/forms/StudentForm";
import { useGetProgramsQuery } from "@/hooks/query-hooks/programs";
import { useGetScholarshipsQuery } from "@/hooks/query-hooks/scholarships";

import useForm from "@/hooks/useForm";
import { StudentFormInputs } from "@/lib/types";
import { validateForm } from "@/lib/validator";
import { studentSchema } from "@/lib/constants/constants";
import { useCreateStudentMutation } from "@/hooks/query-hooks/students";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StudentFormPage = () => {
  const { data: programs, isLoading: isProgramsLoading } =
    useGetProgramsQuery();
  const { data: scholarships, isLoading: isScholarshipsLoading } =
    useGetScholarshipsQuery();
  const addStudentMutation = useCreateStudentMutation();
  const { notify } = useToast();
  const router = useRouter();
  const [error, setError] = useState("");

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

  const onSubmit = async (data: StudentFormInputs) => {
    try {
      await addStudentMutation.mutateAsync(data, {
        onSuccess: () => {
          notify({
            title: "Added Successfully",
            description: "New student added successfully.",
            type: "success",
          });
          router.back();
        },
      });

      // notify({
      //   title: "Added Successfully",
      //   description: "New student added successfully.",
      //   type: "success",
      // });
      // router.back();

      // router.push("/students");
    } catch (err: unknown) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while adding student."
      );
      notify({
        title: "Adding Failed",
        description: "Error adding new successfully.",
        type: "error",
      });
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h2 className="text-2xl font-semibold">Add Student</h2>

      {programs &&
        scholarships &&
        !isProgramsLoading &&
        !isScholarshipsLoading && (
          <AddStudentForm
            programs={programs}
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            error={error}
            scholarships={scholarships}
          />
        )}
    </div>
  );
};

export default StudentFormPage;
