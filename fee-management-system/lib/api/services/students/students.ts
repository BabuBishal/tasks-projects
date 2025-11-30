import { API_ROUTES } from "@/lib/config/api-routes";
import httpClient from "../../api";
import { StudentWithComputedTotals } from "@/lib/types/prisma";
import {
  BulkDeleteResult,
  BulkImportResult,
  BulkPromoteResult,
  StudentResponse,
} from "@/lib/types/api";

// For fetching all students
export const getStudents = async (): Promise<StudentResponse[]> => {
  return await httpClient.get<StudentResponse[]>(API_ROUTES.students);
};

// For fetching a student by id
export const getStudentById = async (
  id: string
): Promise<StudentWithComputedTotals> => {
  return await httpClient.get<StudentWithComputedTotals>(
    API_ROUTES.studentWithId(id)
  );
};

// For creating a new student
export const createStudent = async (
  data: unknown
): Promise<StudentWithComputedTotals> => {
  return await httpClient.post<StudentWithComputedTotals>(
    API_ROUTES.students,
    data
  );
};

// For updating a student
export const updateStudent = async ({
  id,
  data,
}: {
  id: string;
  data: unknown;
}): Promise<StudentWithComputedTotals> => {
  return await httpClient.put<StudentWithComputedTotals>(
    API_ROUTES.studentWithId(id),
    data
  );
};

// For deleting a student
export const deleteStudent = async (id: string): Promise<void> => {
  return await httpClient.delete(API_ROUTES.studentWithId(id));
};

// For bulk deleting students
export const bulkDeleteStudents = async (
  ids: string[]
): Promise<BulkDeleteResult> => {
  return await httpClient.post<BulkDeleteResult>(API_ROUTES.studentBulkDelete, {
    ids,
  });
};

// For bulk importing students
export const bulkImportStudents = async (
  file: File
): Promise<BulkImportResult> => {
  const formData = new FormData();
  formData.append("file", file);

  return await httpClient.post<BulkImportResult>(
    API_ROUTES.studentBulkImport,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// For promoting students to the next semester
export const promoteSemester = async (data: {
  studentIds: string[];
}): Promise<BulkPromoteResult> => {
  return await httpClient.post<BulkPromoteResult>(
    API_ROUTES.studentPromoteSemester,
    data
  );
};
