import { API_ROUTES } from '@/lib/api/api-routes'
import httpClient from '../../../../../lib/api/api'

import { SystemSettings } from '@/lib/types'

export const getSettings = async (): Promise<SystemSettings> => {
  return await httpClient.get<SystemSettings>(API_ROUTES.settings)
}

export const updateSettings = async (data: unknown) => {
  return await httpClient.put(API_ROUTES.settings, data)
}
