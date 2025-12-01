'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/Button'

interface ProgramFormProps {
  initialData?: {
    id?: string
    name: string
    duration: number
  }
  onSubmit: (data: { name: string; duration: number }) => void
  onCancel: () => void
  isLoading?: boolean
}

export default function ProgramForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProgramFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [duration, setDuration] = useState(initialData?.duration || 8)
  const [errors, setErrors] = useState<{ name?: string; duration?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { name?: string; duration?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Program name is required'
    }

    if (duration < 1 || duration > 12) {
      newErrors.duration = 'Duration must be between 1 and 12 semesters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ name, duration })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Program Name
        </label>
        <input
          id="name"
          placeholder="e.g. BSc CSIT, BBA"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
            if (errors.name) setErrors({ ...errors, name: undefined })
          }}
          className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="duration"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Duration (Semesters)
        </label>
        <input
          id="duration"
          type="number"
          min={1}
          max={12}
          value={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDuration(parseInt(e.target.value) || 0)
            if (errors.duration) setErrors({ ...errors, duration: undefined })
          }}
          className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.duration ? 'border-red-500' : ''
          }`}
        />
        {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
        <p className="text-muted-foreground text-xs">Total number of semesters in this program.</p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Program' : 'Create Program'}
        </Button>
      </div>
    </form>
  )
}
