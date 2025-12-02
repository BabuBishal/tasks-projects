import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../../../lib/api/api-routes'
import {
  createStudent,
  deleteStudent,
  updateStudent,
  bulkDeleteStudents,
  bulkImportStudents,
  promoteSemester,
} from '@/app/[locale]/(root)/students/_api/students'

export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
    },
  })
}

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.students, variables.id],
      })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] })
    },
  })
}

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] })
    },
  })
}

export const useBulkDeleteStudentsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bulkDeleteStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.payments] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.paymentStats] })
    },
  })
}

export const useBulkImportStudentsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bulkImportStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
    },
  })
}

export const usePromoteSemesterMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: promoteSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.dashboardStats] })
    },
  })
}
