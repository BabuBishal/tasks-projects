import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../../../lib/config/api-routes";
import {
  getPrograms,
  getProgramsById,
} from "../../../lib/services/programs/programs";

export const useGetProgramsQuery = () => {
  return useQuery({
    queryKey: [API_ROUTES.programs],
    queryFn: () => getPrograms(),
  });
};

export const useGetProgramQuery = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTES.programs, id],
    queryFn: () => getProgramsById(id),
  });
};
