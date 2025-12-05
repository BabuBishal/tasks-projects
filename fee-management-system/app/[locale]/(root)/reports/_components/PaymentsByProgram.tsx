import { PaymentByProgram } from '../_types'

interface PaymentsByProgramProps {
  programs: PaymentByProgram[]
}

export function PaymentsByProgram({ programs }: PaymentsByProgramProps) {
  return (
    <div className="mb-6">
      <h3 className="text-secondary mb-3 text-sm font-semibold">Payments by Program</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-accent">
            <tr>
              <th className="p-3 text-left font-semibold">Program</th>
              <th className="p-3 text-right font-semibold">Payments</th>
              <th className="p-3 text-right font-semibold">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((prog, idx) => (
              <tr key={idx} className="border-border border-b">
                <td className="p-3 font-medium">{prog.program}</td>
                <td className="p-3 text-right">{prog.totalPayments}</td>
                <td className="p-3 text-right">Rs {prog.totalAmount.toLocaleString()}</td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr>
                <td colSpan={3} className="text-muted-foreground p-4 text-center">
                  No payments found for this period
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
