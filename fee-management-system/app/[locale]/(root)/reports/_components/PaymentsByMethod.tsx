import { Banknote, CreditCard, Landmark } from 'lucide-react'
import { PaymentByMethod } from '../_types'

interface PaymentsByMethodProps {
  methods: PaymentByMethod[]
}

export function PaymentsByMethod({ methods }: PaymentsByMethodProps) {
  const getMethodIcon = (method: string) => {
    const methodLower = method.toLowerCase()
    if (methodLower === 'cash') {
      return <Banknote className="mr-2 h-4 w-4" />
    } else if (methodLower.includes('bank')) {
      return <Landmark className="mr-2 h-4 w-4" />
    } else {
      return <CreditCard className="mr-2 h-4 w-4" />
    }
  }

  return (
    <div>
      <h3 className="text-secondary mb-3 text-sm font-semibold">Payments by Method</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {methods.map((method, idx) => (
          <div key={idx} className="bg-accent/50 border-border rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-primary flex items-center font-semibold">
                {getMethodIcon(method.method)}
                {method.method}
              </p>
              <p className="text-primary text-2xl font-bold">{method.count}</p>
            </div>
            <p className="text-muted-foreground text-sm">Rs {method.amount.toLocaleString()}</p>
          </div>
        ))}
        {methods.length === 0 && (
          <div className="text-muted-foreground bg-accent/20 col-span-full rounded p-4 text-center">
            No payments found for this period
          </div>
        )}
      </div>
    </div>
  )
}
