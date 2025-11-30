"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

import StudentFormPage from "../[id]/_components/StudentFormPage";

export default function AddStudentPage() {
  return (
    <div className="w-full  mx-auto mt-10">
      <Breadcrumb
        items={[
          { label: "Students", href: "/students" },
          { label: "Add Student", href: "/students/add" },
        ]}
      />

      <StudentFormPage />
    </div>
  );
}
