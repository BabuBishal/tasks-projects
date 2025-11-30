import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'

import PaymentList from '@/app/[locale]/(root)/payments/_components/PaymentList'
import PaymentHistoryStats from '../_components/PaymentHistoryStats'

export default function PaymentHistoryPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb
        items={[
          { label: 'Payments', href: '/payments' },
          { label: 'History', href: '/payments/history' },
        ]}
      />
      <div>
        <h1 className="text-foreground text-2xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">Complete record of all payment transactions</p>
      </div>

      <PaymentHistoryStats />
      <PaymentList />
    </div>
  )
}
