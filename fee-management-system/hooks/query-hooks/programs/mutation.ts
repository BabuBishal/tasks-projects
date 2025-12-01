import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../lib/api/config/api-routes'
import {
  createProgram,
  deleteProgram,
  updateProgram,
} from '../../../lib/api/services/programs/programs'

export const useCreateProgramMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.programs] })
    },
  })
}

export const useUpdateProgramMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProgram,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.programs, variables.id],
      })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.programs] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.feeStructures] })
    },
  })
}

export const useDeleteProgramMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.programs] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.students] })
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.feeStructures] })
    },
  })
}
