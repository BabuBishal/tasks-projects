import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'
import {
  BulkDeleteResult,
  BulkImportResult,
  BulkPromoteResult,
  StudentResponse,
  PaginatedResponse,
} from '@/lib/types/api'

export type StudentQueryParams = {
  search?: string
  programId?: string
  semester?: string
  status?: string
  page?: number
  limit?: number
}

export const getStudents = async ({
  params,
}: {
  params: StudentQueryParams
}): Promise<PaginatedResponse<StudentResponse>> => {
  const queryParams = new URLSearchParams()

  if (params?.search) queryParams.append('search', params.search)
  if (params?.programId) queryParams.append('programId', params.programId)
  if (params?.semester) queryParams.append('semester', params.semester)
  if (params?.status) queryParams.append('status', params.status)
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())

  const url = queryParams.toString()
    ? `${API_ROUTES.students}?${queryParams.toString()}`
    : API_ROUTES.students

  return await httpClient.get<PaginatedResponse<StudentResponse>>(url)
}

export const getStudentById = async (id: string): Promise<StudentResponse> => {
  return await httpClient.get<StudentResponse>(API_ROUTES.studentWithId(id))
}

export const createStudent = async (data: unknown): Promise<StudentResponse> => {
  return await httpClient.post<StudentResponse>(API_ROUTES.students, data)
}

export const updateStudent = async ({
  id,
  data,
}: {
  id: string
  data: unknown
}): Promise<StudentResponse> => {
  return await httpClient.put<StudentResponse>(API_ROUTES.studentWithId(id), data)
}

export const deleteStudent = async (id: string): Promise<void> => {
  return await httpClient.delete(API_ROUTES.studentWithId(id))
}

export const bulkDeleteStudents = async (studentIds: string[]): Promise<BulkDeleteResult> => {
  return await httpClient.post<BulkDeleteResult>(API_ROUTES.studentBulkDelete, {
    studentIds,
  })
}

export const bulkImportStudents = async (file: File): Promise<BulkImportResult> => {
  // Read file content and send as JSON
  const csvContent = await file.text()

  return await httpClient.post<BulkImportResult>(API_ROUTES.studentBulkImport, {
    csvContent,
  })
}

export const promoteSemester = async (studentIds: string[]): Promise<BulkPromoteResult> => {
  return await httpClient.post<BulkPromoteResult>(API_ROUTES.studentPromoteSemester, { studentIds })
}
