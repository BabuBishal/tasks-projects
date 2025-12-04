'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { Plus } from 'lucide-react'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'

import ProgramContent from './_components/ProgramContent'

export interface Program {
  id: string
  name: string
  duration: number
}

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)

  const openCreateModal = () => {
    setEditingProgram(null)
    setIsModalOpen(true)
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Programs', href: '/programs' }]} />
      <div className="flex items-end justify-between gap-5">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Manage academic programs and their durations</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>
      <ProgramContent
        editingProgram={editingProgram}
        setEditingProgram={setEditingProgram}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
