import { API_ROUTES } from '@/lib/api/api-routes'
import { signIn } from 'next-auth/react'
import httpClient from '../../../../lib/api/api'

import { LoginFormData, RegisterFormData } from '@/lib/schemas/auth.schema'
import { LoginResponse, RegisterResponse } from '../../../../lib/types/api'

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
  const result = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  })

  if (result?.error) {
    throw new Error(
      result.error === 'CredentialsSignin' ? 'Invalid email or password' : result.error
    )
  }

  if (!result?.ok) {
    throw new Error('Login failed')
  }

  return result as unknown as LoginResponse
}

export const registerUser = async (data: RegisterFormData): Promise<RegisterResponse> => {
  return await httpClient.post<RegisterResponse>(API_ROUTES.auth.register, {
    name: data.name,
    email: data.email,
    password: data.password,
  })
}
