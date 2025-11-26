import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import {
  getStudents,
  getStudentById,
} from "../../../lib/services/students/students";

export const useGetStudentsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.students],
    queryFn: () => getStudents(),
  });
};

export const useGetStudentByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTES.students, id],
    queryFn: () => getStudentById(id),
    enabled: !!id, // Only run query if id is provided
  });
};
