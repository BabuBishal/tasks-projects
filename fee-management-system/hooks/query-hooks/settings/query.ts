import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '@/lib/api/config/api-routes'
import { getSettings } from '@/lib/api/services/settings/settings'

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
