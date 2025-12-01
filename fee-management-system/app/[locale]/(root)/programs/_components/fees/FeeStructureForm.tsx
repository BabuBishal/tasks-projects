'use client'

import { Button } from '@/shared/ui/button/Button'
import { useState } from 'react'
import { FeeStructure } from '../../[id]/page'
import { Program } from '@/lib/types'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type FeeStructureFormValues = {
  programId?: string
  semesterNo?: string
  tuitionFee?: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  miscFee?: number
}

interface FeeStructureFormProps {
  initialData?: DeepPartial<FeeStructure>
  onSubmit: (data: FeeStructureFormValues) => void
  onCancel: () => void
  program: Program
  loading?: boolean
}

export default function FeeStructureForm({
  initialData,
  onSubmit,
  onCancel,
  program,
  loading = false,
}: FeeStructureFormProps) {
  const [formData, setFormData] = useState({
    programId: initialData?.programSemester?.programId || '',
    semesterNo: initialData?.programSemester?.semesterNo?.toString() || '',

    tuitionFee: initialData?.tuitionFee || 0,
    labFee: initialData?.labFee || 0,
    libraryFee: initialData?.libraryFee || 0,
    sportsFee: initialData?.sportsFee || 0,
    miscFee: initialData?.miscFee || 0,
  })

  // const selectedProgram = programs.find(p => p.id === formData.programId)
  const availableSemesters = program
    ? Array.from({ length: program.duration }, (_, i) => i + 1)
    : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Fee') || name === 'semesterNo' ? Number(value) || value : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const totalFee =
    Number(formData.tuitionFee || 0) +
    Number(formData.labFee || 0) +
    Number(formData.libraryFee || 0) +
    Number(formData.sportsFee || 0) +
    Number(formData.miscFee || 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Program</label>
          <select
            name="programId"
            value={formData.programId}
            disabled={!!initialData}
            className="bg-background w-full rounded-md border p-2"
            required
          >
            <option value="">Select Program</option>

            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Semester</label>
          <select
            name="semesterNo"
            value={formData.semesterNo}
            onChange={handleChange}
            disabled={!formData.programId}
            className="bg-background w-full rounded-md border p-2"
            required
          >
            <option value="">Select Semester</option>
            {availableSemesters.map(sem => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Tuition Fee</label>
          <input
            type="number"
            name="tuitionFee"
            value={formData.tuitionFee}
            onChange={handleChange}
            className="bg-background w-full rounded-md border p-2"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Lab Fee</label>
          <input
            type="number"
            name="labFee"
            value={formData.labFee}
            onChange={handleChange}
            className="bg-background w-full rounded-md border p-2"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Library Fee</label>
          <input
            type="number"
            name="libraryFee"
            value={formData.libraryFee}
            onChange={handleChange}
            className="bg-background w-full rounded-md border p-2"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Sports Fee</label>
          <input
            type="number"
            name="sportsFee"
            value={formData.sportsFee}
            onChange={handleChange}
            className="bg-background w-full rounded-md border p-2"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Misc Fee</label>
          <input
            type="number"
            name="miscFee"
            value={formData.miscFee}
            onChange={handleChange}
            className="bg-background w-full rounded-md border p-2"
            min="0"
          />
        </div>
      </div>

      <div className="bg-accent flex items-center justify-between rounded-md p-4">
        <span className="font-semibold">Total Fee:</span>
        <span className="text-primary text-xl font-bold">Rs. {totalFee.toLocaleString()}</span>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
