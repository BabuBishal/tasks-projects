import { ChevronDown } from 'lucide-react'

type TimeFrame = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'

interface PeriodOption {
  value: string
  label: string
}

interface ReportHeaderProps {
  timeFrame: TimeFrame
  selectedPeriod: string
  periodOptions: PeriodOption[]
  onTimeFrameChange: (value: string) => void
  onPeriodChange: (value: string) => void
}

export function ReportHeader({
  timeFrame,
  selectedPeriod,
  periodOptions,
  onTimeFrameChange,
  onPeriodChange,
}: ReportHeaderProps) {

  
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground">Generate time-based payment status reports</p>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <select
            value={timeFrame}
            onChange={e => onTimeFrameChange(e.target.value)}
            className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-[140px] appearance-none rounded-md border pr-8 pl-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half Yearly</option>
            <option value="yearly">Yearly</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 opacity-50" />
        </div>

        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={e => onPeriodChange(e.target.value)}
            className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-[180px] appearance-none rounded-md border pr-8 pl-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-3 right-3 h-4 w-4 opacity-50" />
        </div>
      </div>
    </div>
  )
}
