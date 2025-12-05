'use client'

import { useState, useMemo } from 'react'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import { ReportHeader, ReportPreview } from './_components'

type TimeFrame = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'

export default function ReportsPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('monthly')
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  })

  // Calculate date range based on selection
  const dateRange = useMemo(() => {
    let start = new Date()
    let end = new Date()

    if (timeFrame === 'monthly') {
      // selectedPeriod is YYYY-MM
      const [year, month] = selectedPeriod.split('-').map(Number)
      start = new Date(year, month - 1, 1)
      end = new Date(year, month, 0) // Last day of month
    } else if (timeFrame === 'quarterly') {
      // selectedPeriod is YYYY-Qx
      const [yearStr, quarterStr] = selectedPeriod.split('-')
      const year = parseInt(yearStr)
      const quarter = parseInt(quarterStr.replace('Q', ''))
      start = new Date(year, (quarter - 1) * 3, 1)
      end = new Date(year, quarter * 3, 0)
    } else if (timeFrame === 'half-yearly') {
      // selectedPeriod is YYYY-Hx
      const [yearStr, halfStr] = selectedPeriod.split('-')
      const year = parseInt(yearStr)
      const half = parseInt(halfStr.replace('H', ''))
      start = new Date(year, (half - 1) * 6, 1)
      end = new Date(year, half * 6, 0)
    } else if (timeFrame === 'yearly') {
      // selectedPeriod is YYYY
      const year = parseInt(selectedPeriod)
      start = new Date(year, 0, 1)
      end = new Date(year, 11, 31)
    }

    // Set times to start/end of day
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    return { start, end }
  }, [timeFrame, selectedPeriod])

  // Generate options for period selector
  const periodOptions = useMemo(() => {
    const options = []
    const today = new Date()
    const currentYear = today.getFullYear()

    if (timeFrame === 'monthly') {
      for (let i = 0; i < 12; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const value = `${year}-${month}`
        const label = d.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
        options.push({ value, label })
      }
    } else if (timeFrame === 'quarterly') {
      for (let year = currentYear; year >= currentYear - 1; year--) {
        for (let q = 4; q >= 1; q--) {
          if (year === currentYear && q > Math.ceil((today.getMonth() + 1) / 3)) continue
          options.push({ value: `${year}-Q${q}`, label: `Q${q} ${year}` })
        }
      }
    } else if (timeFrame === 'half-yearly') {
      for (let year = currentYear; year >= currentYear - 1; year--) {
        for (let h = 2; h >= 1; h--) {
          if (year === currentYear && h > Math.ceil((today.getMonth() + 1) / 6)) continue
          options.push({ value: `${year}-H${h}`, label: `H${h} ${year}` })
        }
      }
    } else if (timeFrame === 'yearly') {
      for (let i = 0; i < 3; i++) {
        const year = currentYear - i
        options.push({ value: `${year}`, label: `${year}` })
      }
    }
    return options
  }, [timeFrame])

  // Update selected period when timeframe changes
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value as TimeFrame)
    // Reset to current/latest period for the new timeframe
    if (value === 'monthly') {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      setSelectedPeriod(`${year}-${month}`)
    } else if (value === 'quarterly') {
      const q = Math.ceil((new Date().getMonth() + 1) / 3)
      setSelectedPeriod(`${new Date().getFullYear()}-Q${q}`)
    } else if (value === 'half-yearly') {
      const h = Math.ceil((new Date().getMonth() + 1) / 6)
      setSelectedPeriod(`${new Date().getFullYear()}-H${h}`)
    } else if (value === 'yearly') {
      setSelectedPeriod(`${new Date().getFullYear()}`)
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Reports', href: '/reports' }]} />

      <ReportHeader
        timeFrame={timeFrame}
        selectedPeriod={selectedPeriod}
        periodOptions={periodOptions}
        onTimeFrameChange={handleTimeFrameChange}
        onPeriodChange={setSelectedPeriod}
      />

      <ReportPreview dateRange={dateRange} selectedPeriod={selectedPeriod} />
    </div>
  )
}
