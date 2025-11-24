import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPrograms = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programs}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }

  return res.json();
};

export const useGetPrograms = () => {
  return useQuery({
    queryKey: [API_ROUTES.programs],
    queryFn: () => getPrograms(),
  });
};
