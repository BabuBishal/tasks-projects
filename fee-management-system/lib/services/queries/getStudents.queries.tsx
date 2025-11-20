import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getStudents = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.students}`, {
    next: { revalidate: 600 },
  });

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
