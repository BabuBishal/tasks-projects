import { Suspense } from 'react'
import PaymentPageContent from './_components/PaymentPageContent'

export type { StudentType } from './_components/PaymentPageContent'

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-8">Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}
