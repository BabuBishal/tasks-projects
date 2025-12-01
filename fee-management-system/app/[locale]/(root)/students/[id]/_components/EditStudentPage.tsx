'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useForm from '@/hooks/useForm'

import { studentSchema } from '@/lib/constants/constants'
import { validateForm } from '@/lib/validator'
import { StudentFormInputs } from '@/lib/types'
import { useToast } from '@/components/ui/toast'
import StudentForm from '../../../../../../components/forms/StudentForm'

import { useGetStudentByIdQuery, useUpdateStudentMutation } from '@/hooks/query-hooks/students'
import { useGetProgramsQuery } from '@/hooks/query-hooks/programs'
import { useGetScholarshipsQuery } from '@/hooks/query-hooks/scholarships'

export default function EditStudentPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string
  const { notify } = useToast()

  const { data: studentData, isLoading: studentLoading } = useGetStudentByIdQuery(studentId)
  const { data: programs = [] } = useGetProgramsQuery()
  const { data: scholarships = [] } = useGetScholarshipsQuery()
  const updateStudentMutation = useUpdateStudentMutation()

  const { formData, formErrors, handleChange, handleSubmit } = useForm<StudentFormInputs>({
    initialValues: {
      name: studentData?.name || '',
      email: studentData?.email || '',
      programId: studentData?.programId || '',
      semester: studentData?.semester || 1,
      phone: studentData?.phone || '',
      address: studentData?.address || '',
      scholarshipId: '',
    },
    validateForm,
    schema: studentSchema,
  })

  // useEffect(() => {
  //   if (studentData) {
  //     setFormData({
  //       name: studentData.name || '',
  //       email: studentData.email || '',
  //       programId: studentData.programId || '',
  //       semester: studentData.semester || 1,
  //       phone: studentData.phone || '',
  //       address: studentData.address || '',
  //       scholarshipId: studentData.scholarships?.[0]?.scholarshipId || '',
  //     })
  //   }
  // }, [studentData, setFormData])

  const onSubmit = async (data: StudentFormInputs) => {
    try {
      await updateStudentMutation.mutateAsync({
        id: studentId,
        data: data,
      })

      setError('')
      notify({
        title: 'Updated Successfully',
        description: 'Student updated successfully.',
        type: 'success',
      })
      router.back()
    } catch (err: unknown) {
      console.error('Error:', err)
      setError((err as Error).message || 'Something went wrong while updating student.')
      notify({
        title: 'Update Failed',
        description: (err as Error).message || 'Error updating student.',
        type: 'error',
      })
    }
  }

  if (studentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-semibold">Edit Student</h2>
      <StudentForm
        programs={programs}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
        scholarships={scholarships}
        loading={updateStudentMutation.isPending}
      />
    </div>
  )
}
