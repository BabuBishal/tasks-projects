'use client'
import AddStudentForm from '@/shared/forms/StudentForm'
import { useGetProgramsQuery } from '@/app/[locale]/(root)/programs/_hooks'
import { useGetScholarshipsQuery } from '@/app/[locale]/(root)/_hooks/scholarships'

import useForm from '@/hooks/useForm'
import { StudentFormInputs } from '@/lib/types'
import { validateForm } from '@/lib/validator'
import { studentSchema } from '@/lib/constants/constants'
import { useCreateStudentMutation } from '@/app/[locale]/(root)/students/_hooks'
import { useToast } from '@/shared/ui/toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const StudentFormPage = () => {
  const { data: programs, isLoading: isProgramsLoading } = useGetProgramsQuery()
  const { data: scholarships, isLoading: isScholarshipsLoading } = useGetScholarshipsQuery()
  const addStudentMutation = useCreateStudentMutation()
  const { notify } = useToast()
  const router = useRouter()
  const [error, setError] = useState('')

  const { formData, formErrors, handleChange, handleSubmit } = useForm<StudentFormInputs>({
    initialValues: {
      name: '',
      email: '',
      programId: '',
      semester: 1,
      phone: '',
      address: '',
      scholarshipId: '',
    },
    validateForm,
    schema: studentSchema,
  })

  const onSubmit = async (data: StudentFormInputs) => {
    try {
      await addStudentMutation.mutateAsync(data, {
        onSuccess: () => {
          notify({
            title: 'Added Successfully',
            description: 'New student added successfully.',
            type: 'success',
          })
          router.back()
        },
      })

      // notify({
      //   title: "Added Successfully",
      //   description: "New student added successfully.",
      //   type: "success",
      // });
      // router.back();

      // router.push("/students");
    } catch (err: unknown) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong while adding student.')
      notify({
        title: 'Adding Failed',
        description: 'Error adding new successfully.',
        type: 'error',
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-semibold">Add Student</h2>

      {programs && scholarships && !isProgramsLoading && !isScholarshipsLoading && (
        <AddStudentForm
          programs={programs}
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          error={error}
          scholarships={scholarships}
        />
      )}
    </div>
  )
}

export default StudentFormPage
