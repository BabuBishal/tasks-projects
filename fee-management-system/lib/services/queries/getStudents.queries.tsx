import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getStudents = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.students}`);

  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }

  return res.json();
};

export const useGetStudents = () => {
  return useQuery({
    queryKey: [API_ROUTES.students],
    queryFn: () => getStudents(),
  });
};

export const getStudentById = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.studentWithId(id)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch student");
  }

  return res.json();
};

export const useGetStudentById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTES.students, id],
    queryFn: () => getStudentById(id),
    enabled: !!id, // Only run query if id is provided
  });
};
