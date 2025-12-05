import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../lib/api/api'
import { FeeStructureResponse, OverdueFee } from '@/lib/types/api'
import { FeeStructure } from '@prisma/client'

export const getFeeStructures = async (): Promise<FeeStructureResponse[]> => {
  return await httpClient.get(API_ROUTES.feeStructures)
}

export const createFeeStructure = async (
  data: Partial<FeeStructure> | { programId: string; semesterNo: number }
): Promise<FeeStructure> => {
  return await httpClient.post(API_ROUTES.feeStructures, data)
}

export const getFeeStructureById = async (id: string): Promise<FeeStructureResponse> => {
  return await httpClient.get(API_ROUTES.feeStructureWithId(id))
}

export const updateFeeStructure = async ({
  id,
  data,
}: {
  id: string
  data: Partial<FeeStructure> | { programId: string; semesterNo: number }
}): Promise<FeeStructure> => {
  return await httpClient.put(API_ROUTES.feeStructureWithId(id), data)
}

export const deleteFeeStructure = async (id: string): Promise<void> => {
  await httpClient.delete(API_ROUTES.feeStructureWithId(id))
}

export const getOverdueFees = async (): Promise<OverdueFee[]> => {
  return await httpClient.get(API_ROUTES.overdueFees)
}
