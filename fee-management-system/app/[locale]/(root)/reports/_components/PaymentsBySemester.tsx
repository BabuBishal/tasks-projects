import { PaymentBySemester } from '../_types'

interface PaymentsBySemesterProps {
  semesters: PaymentBySemester[]
}

export function PaymentsBySemester({ semesters }: PaymentsBySemesterProps) {
  return (
    <div className="mb-6">
      <h3 className="text-secondary mb-3 text-sm font-semibold">Payments by Semester</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {semesters.map((sem, idx) => (
          <div key={idx} className="bg-accent/50 border-border rounded-lg border p-4">
            <p className="text-muted-foreground mb-1 text-xs">Semester {sem.semester}</p>
            <p className="text-primary text-lg font-bold">{sem.totalPayments}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Rs {sem.totalAmount.toLocaleString()}
            </p>
          </div>
        ))}
        {semesters.length === 0 && (
          <div className="text-muted-foreground bg-accent/20 col-span-full rounded p-4 text-center">
            No payments found for this period
          </div>
        )}
      </div>
    </div>
  )
}
