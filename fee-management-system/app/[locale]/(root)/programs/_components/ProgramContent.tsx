'use client'
import { Dispatch, SetStateAction } from 'react'
import { Program } from '../page'
import { useGetProgramsQuery } from '../_hooks'
import ProgramList from './ProgramList'
import { ProgramListSkeleton } from './skeletons/ProgramListSkeleton'
import AddProgramModal from './AddProgramModal'

const ProgramContent = ({
  setEditingProgram,
  editingProgram,
  isModalOpen,
  setIsModalOpen,
}: {
  setEditingProgram: Dispatch<SetStateAction<Program | null>>
  editingProgram: Program | null
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { data: programs, isLoading } = useGetProgramsQuery()

  const openEditModal = (program: Program) => {
    setEditingProgram(program)
    setIsModalOpen(true)
  }
  return (
    <>
      {isLoading ? (
        <ProgramListSkeleton />
      ) : (
        <ProgramList programs={programs || []} onEdit={openEditModal} />
      )}
      <AddProgramModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLoading={isLoading}
        editingProgram={editingProgram}
        setEditingProgram={setEditingProgram}
      />
    </>
  )
}

export default ProgramContent
