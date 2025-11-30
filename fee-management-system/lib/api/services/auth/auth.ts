import { API_ROUTES } from '@/lib/config/api-routes'
import { signIn } from 'next-auth/react'
import httpClient from '../../api'

import { LoginFormData, RegisterFormData } from '@/lib/schemas/auth.schema'
import { LoginResponse, RegisterResponse } from '../../../types/api'

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
  return (await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  })) as LoginResponse
}

export const registerUser = async (data: RegisterFormData): Promise<RegisterResponse> => {
  return await httpClient.post<RegisterResponse>(API_ROUTES.auth.register, {
    name: data.name,
    email: data.email,
    password: data.password,
  })
}
