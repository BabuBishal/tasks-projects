'use client'
import LoginForm from '@/components/forms/LoginForm'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toast'
import { useLoginMutation } from '@/hooks/query-hooks/auth/mutation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth.schema'

const LoginPage = () => {
  const router = useRouter()
  const { locale } = useParams() as { locale: string }
  const { notify } = useToast()

  const { mutate: login, isPending, error } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        notify({
          title: 'Success',
          description: 'Login Successful',
          type: 'success',
        })
        router.push(`/${locale}/dashboard`)
      },
      onError: (error: Error) => {
        notify({
          title: 'Login Error',
          description: error.message,
          type: 'error',
        })
      },
    })
  }

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center gap-5 p-20">
      <div className="text-primary text-2xl font-bold">Fee Payment System</div>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        error={error?.message || ''}
        isLoading={isPending}
      />
    </div>
  )
}

export default LoginPage
