import React, { useMemo, useCallback } from 'react'
import { Button } from '@/shared/ui/button/Button'
import { BarChart3, Download } from 'lucide-react'
import { PaymentsByProgram } from './PaymentsByProgram'
import { PaymentsBySemester } from './PaymentsBySemester'
import { PaymentsByMethod } from './PaymentsByMethod'
import { generatePaymentStatusReport } from '../_services/reportGenerator'
import { DateRange } from '../_types'
import { useGetPaymentReportStatsQuery } from '../_hooks'
import { ReportsSkeleton } from './skeletons/ReportsSkeleton'
import PaymentsSummary from './PaymentsSummary'

interface ReportPreviewProps {
  dateRange: DateRange
  selectedPeriod: string
}

export function ReportPreview({ dateRange, selectedPeriod }: ReportPreviewProps) {
  const { data: paymentStats, isLoading } = useGetPaymentReportStatsQuery({
    startDate: dateRange.start.toISOString(),
    endDate: dateRange.end.toISOString(),
  })

  const totalTransactions = useMemo(
    () => paymentStats?.byProgram.reduce((sum, item) => sum + item.totalPayments, 0) || 0,
    [paymentStats?.byProgram]
  )

  const totalRevenue = useMemo(
    () => paymentStats?.byProgram.reduce((sum, item) => sum + item.totalAmount, 0) || 0,
    [paymentStats?.byProgram]
  )

  const avgTransaction = useMemo(
    () => Math.round(totalRevenue / (totalTransactions || 1)),
    [totalRevenue, totalTransactions]
  )

  const handleGenerateReport = useCallback(async () => {
    if (!paymentStats) return
    await generatePaymentStatusReport(paymentStats, dateRange, selectedPeriod)
  }, [paymentStats, dateRange, selectedPeriod])

  if (isLoading || !paymentStats) {
    return <ReportsSkeleton />
  }

  return (
    <div className="bg-card border-border rounded-lg border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary h-5 w-5" />
          <h2 className="text-primary text-lg font-semibold">
            Report Preview: {dateRange.start.toLocaleDateString('en-GB')} -{' '}
            {dateRange.end.toLocaleDateString('en-GB')}
          </h2>
        </div>
        <Button
          variant="primary"
          onClick={handleGenerateReport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Generate PDF
        </Button>
      </div>

      <PaymentsByProgram programs={paymentStats.byProgram} />
      <PaymentsBySemester semesters={paymentStats.bySemester} />
      <PaymentsByMethod methods={paymentStats.byMethod} />

      <PaymentsSummary
        totalTransactions={totalTransactions}
        totalRevenue={totalRevenue}
        avgTransaction={avgTransaction}
      />
    </div>
  )
}
