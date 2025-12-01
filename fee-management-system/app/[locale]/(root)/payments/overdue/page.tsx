import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import { AlertCircle } from 'lucide-react'
import Overdue from '../_components/Overdue'

export default function OverduePaymentsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb
        items={[
          { label: 'Payments', href: '/payments' },
          { label: 'Overdue', href: '/payments/overdue' },
        ]}
      />
      <div>
        <h1 className="text-foreground flex items-center gap-2 text-2xl font-bold">
          <AlertCircle className="h-6 w-6 text-red-600" />
          Overdue Payments
        </h1>
        <p className="text-muted-foreground">Students with outstanding payments past due date</p>
      </div>

      <Overdue />
    </div>
  )
}
