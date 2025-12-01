import { API_ROUTES } from '@/lib/api/config/api-routes'
import httpClient from '../../api'
import { Program } from '@/lib/types/prisma'

export const getPrograms = async (): Promise<Program[]> => {
  return await httpClient.get<Program[]>(API_ROUTES.programs)
}

export const getProgramsById = async (id: string): Promise<Program> => {
  return await httpClient.get<Program>(API_ROUTES.programWithId(id))
}

export const createProgram = async (data: { name: string; duration: number }): Promise<Program> => {
  return await httpClient.post<Program>(API_ROUTES.programs, data)
}

export const updateProgram = async ({
  id,
  data,
}: {
  id: string
  data: { name: string; duration: number }
}): Promise<Program> => {
  return await httpClient.put<Program>(API_ROUTES.programWithId(id), data)
}

export const deleteProgram = async (id: string): Promise<void> => {
  return await httpClient.delete(API_ROUTES.programWithId(id))
}
