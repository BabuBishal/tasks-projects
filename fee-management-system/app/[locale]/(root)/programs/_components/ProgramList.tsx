'use client'

import React, { useCallback } from 'react'
import { Card, CardContent } from '@/shared/ui/card/Card'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { Edit, Trash2, GraduationCap, BookOpen, Users } from 'lucide-react'
import { useDeleteProgramMutation } from '../_hooks'
import { useToast } from '@/shared/ui/toast'

interface Program {
  id: string
  name: string
  duration: number
  _count?: {
    students: number
  }
}

interface ProgramListProps {
  programs: Program[]
  onEdit: (program: Program) => void
}

const ProgramList = React.memo(({ programs, onEdit }: ProgramListProps) => {
  const deleteProgramMutation = useDeleteProgramMutation()

  const { notify } = useToast()

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProgramMutation.mutateAsync(id)

        notify({
          title: 'Success',
          description: 'Program deleted successfully',
          type: 'success',
        })
      } catch (error: unknown) {
        notify({
          title: 'Error',
          description: (error as Error).message || 'Failed to delete program',
          type: 'error',
        })
      }
    },
    [deleteProgramMutation, notify]
  )
  if (programs.length === 0) {
    return (
      <div className="bg-muted/10 rounded-lg border-2 border-dashed py-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <GraduationCap className="text-primary h-8 w-8" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No programs found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first academic program.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {programs.map(program => (
        <Card key={program.id} className="group transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="bg-primary/10 rounded-lg p-2">
                <GraduationCap className="text-primary h-6 w-6" />
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={e => {
                    e.stopPropagation()
                    onEdit(program)
                  }}
                >
                  <Edit className="text-muted-foreground hover:text-primary h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={e => {
                    e.stopPropagation()
                    if (
                      window.confirm(
                        `Are you sure you want to delete ${program.name}? This action cannot be undone.`
                      )
                    ) {
                      handleDelete(program.id)
                    }
                  }}
                >
                  <Trash2 className="text-muted-foreground hover:text-destructive h-4 w-4" />
                </Button>
              </div>
            </div>

            <Link href={`/programs/${program.id}`} className="block">
              <h3 className="hover:text-primary mb-2 text-xl font-bold transition-colors">
                {program.name}
              </h3>
            </Link>

            <div className="text-muted-foreground space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{program.duration} Semesters</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{program._count?.students || 0} Students</span>
              </div>
            </div>

            <div className="border-border mt-4 border-t pt-4">
              <Link href={`/programs/${program.id}`}>
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground w-full transition-colors"
                >
                  View Fee Structure
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

ProgramList.displayName = 'ProgramList'

export default ProgramList
