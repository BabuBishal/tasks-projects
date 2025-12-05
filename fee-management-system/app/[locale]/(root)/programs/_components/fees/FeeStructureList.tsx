'use client'

import { FeeStructureResponse } from '@/lib/types/api'
import FeeStructureCard from './FeeStructureCard'

interface FeeStructureListProps {
  feeStructures: FeeStructureResponse[]
  onSelect: (feeStructure: FeeStructureResponse) => void
}

export default function FeeStructureList({ feeStructures, onSelect }: FeeStructureListProps) {
  if (feeStructures.length === 0) {
    return (
      <div className="bg-muted/10 rounded-lg border-2 border-dashed py-12 text-center">
        <p className="text-muted-foreground">No fee structures found. Add one to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {feeStructures.map(fee => (
        <FeeStructureCard key={fee.id} feeStructure={fee} onSelect={onSelect} />
      ))}
    </div>
  )
}
