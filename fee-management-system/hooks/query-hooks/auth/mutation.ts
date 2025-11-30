import { loginUser, registerUser } from '@/lib/api/services/auth/auth'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,

    onError: (error: Error) => {
      console.error('Login error:', error.message)
    },
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,

    onError: (error: Error) => {
      console.error('Registration error:', error.message)
    },
  })
}
