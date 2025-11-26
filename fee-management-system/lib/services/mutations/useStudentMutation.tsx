import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Create student mutation
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

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
    },
  });
};

// Update student mutation
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

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data, variables) => {
      // Invalidate specific student query
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] });
    },
  });
};

// Delete student mutation
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

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] });
    },
  });
};

// Bulk delete students mutation
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

export const useBulkDeleteStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkDeleteStudents,
    onSuccess: () => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] });
    },
  });
};

// Bulk import students mutation
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

export const useBulkImportStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkImportStudents,
    onSuccess: () => {
      // Invalidate students and dashboard
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
    },
  });
};

// Promote semester mutation
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

export const usePromoteSemester = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promoteSemester,
    onSuccess: () => {
      // Invalidate all student-related queries
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] });
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] });
    },
  });
};
