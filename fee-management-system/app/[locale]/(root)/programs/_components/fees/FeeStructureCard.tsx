'use client'

import { memo, useCallback } from 'react'
import { Card, CardContent } from '@/shared/ui/card/Card'
import Badge from '@/shared/ui/badges/Badges'
import { Coins } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/utils'
import { FeeStructureResponse } from '@/lib/types/api'

interface FeeStructureCardProps {
  feeStructure: FeeStructureResponse
  onSelect: (fee: FeeStructureResponse) => void
}

const FeeStructureCard = memo(({ feeStructure, onSelect }: FeeStructureCardProps) => {
  const programName = feeStructure?.programSemester?.program?.name ?? '-'
  const semesterNo = feeStructure?.programSemester?.semesterNo ?? '-'
  const tuitionFee = feeStructure?.tuitionFee ?? 0
  const totalFee = feeStructure?.totalFee ?? 0

  const formattedTuitionFee = formatCurrency(tuitionFee)
  const formattedTotalFee = formatCurrency(totalFee)

  const handleClick = useCallback(() => {
    onSelect(feeStructure)
  }, [onSelect, feeStructure])

  return (
    <Card
      className="group border-l-primary relative cursor-pointer overflow-hidden border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="from-primary/5 absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <CardContent className="relative space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
              {programName}
            </p>
            <h3 className="text-foreground text-xl font-bold">Semester {semesterNo}</h3>
          </div>
          <Badge variant="info" className="bg-primary/10 text-primary border-primary/20 shadow-sm">
            Active
          </Badge>
        </div>

        <div className="border-border/50 space-y-3 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tuition Fee</span>
            <span className="font-medium">{formattedTuitionFee}</span>
          </div>

          <div className="border-border/50 flex items-center justify-between border-t border-dashed pt-2">
            <span className="text-foreground text-sm font-medium">Total Fee</span>
            <div className="text-primary flex items-center text-lg font-bold">
              <Coins className="mr-1.5 h-4 w-4" />
              {formattedTotalFee}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

FeeStructureCard.displayName = 'FeeStructureCard'

export default FeeStructureCard
