import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//for fetching all students
export const getStudents = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.students}`);

  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }

  return res.json();
};

//for fetching a student by id
export const getStudentById = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentWithId(id)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch student");
  }

  return res.json();
};

//for creating a new student
export const createStudent = async (data: unknown) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.students}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create student");
  }

  return res.json();
};

//for updating a student
export const updateStudent = async ({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentWithId(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update student");
  }

  return res.json();
};

//for deleting a student
export const deleteStudent = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentWithId(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete student");
  }

  return res.json();
};

//for bulk deleting students
export const bulkDeleteStudents = async (ids: string[]) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentBulkDelete}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete students");
  }

  return res.json();
};

//for bulk importing students
export const bulkImportStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${baseUrl}${API_ROUTES.studentBulkImport}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to import students");
  }

  return res.json();
};

//for promoting students to the next semester
export const promoteSemester = async (data: { programId: string }) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentPromoteSemester}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to promote students");
  }

  return res.json();
};
