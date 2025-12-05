import { API_ROUTES } from '@/lib/api/api-routes'
import { PasswordChangeInput, ProfileUpdateInput, UserWithProfile } from '@/lib/types'
import httpClient from '../../../../../lib/api/api'

export const getProfile = async (): Promise<UserWithProfile> => {
  return await httpClient.get(API_ROUTES.profile)
}

export const updateProfile = async (data: ProfileUpdateInput): Promise<UserWithProfile> => {
  return await httpClient.put(API_ROUTES.profile, data)
}

export const changePassword = async (data: PasswordChangeInput): Promise<UserWithProfile> => {
  return await httpClient.put(API_ROUTES.profilePassword, data)
}

export const uploadProfilePhoto = async (file: File): Promise<UserWithProfile> => {
  const formData = new FormData()
  formData.append('photo', file)

  return await httpClient.post(API_ROUTES.profilePhoto, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
