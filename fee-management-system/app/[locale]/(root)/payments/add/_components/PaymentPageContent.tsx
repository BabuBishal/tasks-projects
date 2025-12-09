'use client'
import { useState, useEffect, useMemo } from 'react'
import { Payment, PaymentFormInputs, StudentFee } from '@/lib/types'
import { useToast } from '@/shared/ui/toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetStudentsQuery } from '@/app/[locale]/(root)/students/_hooks/query'
import { useAddPaymentMutation } from '@/app/[locale]/(root)/payments/_hooks/mutation'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import { FeeStructureResponse } from '@/lib/types/api'
import PaymentForm from '@/shared/forms/PaymentForm'

export type StudentFee1 = StudentFee & {
  feeStructure: FeeStructureResponse
  payments: Payment[]
}

export type StudentType = {
  id: string
  name: string
  rollNo: string
  program: string
  year: number
  semester: number
  email: string
  phone: string
  address: string
  fees: {
    total: number
    paid: number
    balance: number
    dueDate: string | Date | null
    status: string
    totalOutstandingAll: number
  }
  feesList: {
    id: string
    academicYear: string
    semesterNo: number
    originalFee: number
    discount: number
    payableFee: number
    paid: number
    balance: number
    status: string
    dueDate: string | Date | null
  }[]
}

export default function PaymentPageContent() {
  const { notify } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, isLoading: loadingStudents } = useGetStudentsQuery({})
  const addPaymentMutation = useAddPaymentMutation()
  const studentsData = data?.data
  const [error, setError] = useState('')

  const students = useMemo(() => {
    return (studentsData || []).map(s => {
      const programName = s.program?.name ?? s.program ?? ''

      const feesList = (s.fees || []).map(f => ({
        id: f.id,
        academicYear: f.academicYear,
        semesterNo:
          f.feeStructure?.programSemester?.semesterNo ?? f.feeStructure?.programSemester ?? 0,
        originalFee: f.originalFee ?? f.feeStructure?.totalFee ?? 0,
        discount: f.discount ?? 0,
        payableFee: f.payableFee ?? f.originalFee ?? 0,
        paid: f.paid ?? 0,
        balance: f.balance ?? (f.payableFee ?? 0) - (f.paid ?? 0),
        status: f.status ?? 'N/A',
        dueDate: f.dueDate ?? null,
      }))

      const currentAcademicYear = `${s.year}/${String(s.year + 1).slice(-2)}`
      let primary = feesList.find(
        ff => ff.semesterNo === s.semester && ff.academicYear === currentAcademicYear
      )
      if (!primary)
        primary = feesList.find(ff => ff.semesterNo === s.semester) || feesList[0] || null

      const total = primary?.payableFee ?? 0
      const paid = primary?.paid ?? 0
      const balance = primary?.balance ?? total - paid
      const dueDate = primary?.dueDate ?? null
      const status = primary?.status ?? 'N/A'

      const totalOutstandingAll = feesList.reduce((acc: number, f) => acc + (f.balance ?? 0), 0)

      return {
        id: s.id,
        name: s.name,
        rollNo: s.rollNo,
        program: programName,
        year: s.year,
        semester: s.semester,
        email: s.email,
        phone: s.phone,
        address: s.address,
        fees: {
          total,
          paid,
          balance,
          dueDate,
          status,
          totalOutstandingAll,
        },
        feesList,
      }
    })
  }, [studentsData])

  const [formData, setFormData] = useState<PaymentFormInputs>({
    id: '',
    amount: 0,
    method: 'cash',
    selectedFeeIds: '',
  })

  const [formErrors, setFormErrors] = useState({
    id: '',
    amount: '',
    method: '',
  })

  // Pre-select student from URL parameter - use initializer to avoid cascading renders
  useEffect(() => {
    const studentId = searchParams.get('studentId')
    if (studentId && students.length > 0) {
      const studentExists = students.find(s => s.id === studentId)
      if (studentExists) {
        setFormData(prev => {
          if (prev.id !== studentId) {
            return { ...prev, id: studentId }
          }
          return prev
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students.length, searchParams])

  const setFormAmount = (value: number) =>
    setFormData(prev => ({ ...prev, amount: Number(value || 0) }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }))

    setFormErrors(prev => ({
      ...prev,
      [name]: '',
    }))
  }

  const validateForm = (): boolean => {
    const errors = {
      id: '',
      amount: '',
      method: '',
    }

    if (!formData.id) errors.id = 'Student is required'
    if (!formData.amount || formData.amount <= 0) errors.amount = 'Valid amount is required'
    if (!formData.method) errors.method = 'Payment method is required'

    setFormErrors(errors)

    // Also check if any semesters are selected
    if (!formData.selectedFeeIds || formData.selectedFeeIds.trim() === '') {
      setError('Please select at least one semester to pay')
      return false
    }

    return !errors.id && !errors.amount && !errors.method
  }

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setError('')

      // Validate that we have selected fees
      if (!formData.selectedFeeIds || formData.selectedFeeIds.trim() === '') {
        setError('Please select at least one semester to pay')
        return
      }

      const paymentData = {
        studentId: formData.id,
        amount: formData.amount,
        method: formData.method,
        selectedFeeIds: formData.selectedFeeIds.split(',').filter(id => id.trim() !== ''),
      }

      await addPaymentMutation.mutateAsync(paymentData)

      setFormData({
        id: '',
        amount: 0,
        method: 'cash',
        selectedFeeIds: '',
      })
      notify({
        title: 'Payment Successful',
        description: 'Added new payment successfully.',
        type: 'success',
      })
      router.back()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to process payment')
      notify({
        title: 'Payment Failed',
        description: err instanceof Error ? err.message : 'Failed to process payment.',
        type: 'error',
      })
    }
  }

  return (
    <div className="container mx-auto">
      <Breadcrumb
        items={[
          { label: 'Payments', href: '/payments' },
          { label: 'Add', href: '/payments/add' },
        ]}
      />
      <PaymentForm
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={error}
        students={students}
        setAmount={setFormAmount}
        loading={loadingStudents}
      />
    </div>
  )
}
