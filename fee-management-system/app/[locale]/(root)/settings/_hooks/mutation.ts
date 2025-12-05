import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '@/lib/api/api-routes'
import { updateSettings } from '@/app/[locale]/(root)/settings/_api/settings'

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.settings] })
    },
  })
}
