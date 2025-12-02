import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'
import { StudentWithComputedTotals } from '@/lib/types/prisma'
import {
  BulkDeleteResult,
  BulkImportResult,
  BulkPromoteResult,
  StudentResponse,
} from '@/lib/types/api'

export const getStudents = async (params?: {
  search?: string
  programId?: string
  semester?: string
  status?: string
}): Promise<StudentResponse[]> => {
  const queryParams = new URLSearchParams()

  if (params?.search) queryParams.append('search', params.search)
  if (params?.programId) queryParams.append('programId', params.programId)
  if (params?.semester) queryParams.append('semester', params.semester)
  if (params?.status) queryParams.append('status', params.status)

  const url = queryParams.toString()
    ? `${API_ROUTES.students}?${queryParams.toString()}`
    : API_ROUTES.students

  return await httpClient.get<StudentResponse[]>(url)
}

export const getStudentById = async (id: string): Promise<StudentWithComputedTotals> => {
  return await httpClient.get<StudentWithComputedTotals>(API_ROUTES.studentWithId(id))
}

export const createStudent = async (data: unknown): Promise<StudentWithComputedTotals> => {
  return await httpClient.post<StudentWithComputedTotals>(API_ROUTES.students, data)
}

export const updateStudent = async ({
  id,
  data,
}: {
  id: string
  data: unknown
}): Promise<StudentWithComputedTotals> => {
  return await httpClient.put<StudentWithComputedTotals>(API_ROUTES.studentWithId(id), data)
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
  const formData = new FormData()
  formData.append('file', file)

  return await httpClient.post<BulkImportResult>(API_ROUTES.studentBulkImport, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const promoteSemester = async (studentIds: string[]): Promise<BulkPromoteResult> => {
  return await httpClient.post<BulkPromoteResult>(API_ROUTES.studentPromoteSemester, { studentIds })
}
