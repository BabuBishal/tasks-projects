import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '@/lib/api/api-routes'
import { getSettings } from '@/app/[locale]/(root)/settings/_api/settings'

import { SystemSettings } from '@/lib/types'

export const useSettingsQuery = () => {
  return useQuery<SystemSettings>({
    queryKey: [API_ROUTES.settings],
    queryFn: getSettings,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
