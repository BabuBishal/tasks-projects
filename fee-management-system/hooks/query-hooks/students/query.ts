import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import {
  getStudents,
  getStudentById,
} from "../../../lib/api/services/students/students";
import { StudentResponse } from "@/lib/types/api";
import { StudentWithComputedTotals } from "@/lib/types";

export const useGetStudentsQuery = () => {
  return useQuery<StudentResponse[]>({
    queryKey: [API_ROUTES.students],
    queryFn: () => getStudents(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useGetStudentByIdQuery = (id: string) => {
  return useQuery<StudentWithComputedTotals>({
    queryKey: [API_ROUTES.students, id],
    queryFn: () => getStudentById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
