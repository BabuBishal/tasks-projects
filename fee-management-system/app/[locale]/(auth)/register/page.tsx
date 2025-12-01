'use client'
import { useParams, useRouter } from 'next/navigation'
import { type RegisterFormData } from '@/lib/schemas/auth.schema'
import RegisterForm from '@/shared/forms/RegisterForm'
import { useToast } from '@/shared/ui/toast'
import { useRegisterMutation } from '@/app/[locale]/(auth)/_hooks/mutation'
import { useForm } from 'react-hook-form'
import { loginUser } from '@/app/[locale]/(auth)/_api/auth'

const RegisterPage = () => {
  const router = useRouter()
  const { locale } = useParams() as { locale: string }
  const { notify } = useToast()

  const { mutate: registerUser, isPending, error } = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: async () => {
        notify({
          title: 'Success',
          description: 'Registration Successful.',
          type: 'success',
        })

        // Auto-login after registration
        try {
          await loginUser({
            email: data.email,
            password: data.password,
          })
          router.push(`/${locale}/dashboard`)
        } catch (error) {
          console.error('Auto-login failed:', error)
          notify({
            title: 'Redirect Error',
            description: 'Auto-login failed.',
            type: 'error',
          })
          // Redirect to login page if auto-login fails
          router.push(`/${locale}/login`)
        }
      },
      onError: (error: Error) => {
        notify({
          title: 'Registration Error',
          description: error.message,
          type: 'error',
        })
      },
    })
  }

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center gap-5 p-20">
      <div className="text-primary text-2xl font-bold">Fee Payment System</div>
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        error={error?.message || ''}
        isLoading={isPending}
      />
    </div>
  )
}

export default RegisterPage
