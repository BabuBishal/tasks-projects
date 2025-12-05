export interface PaymentByProgram {
  program: string
  totalPayments: number
  totalAmount: number
}

export interface PaymentBySemester {
  semester: number
  totalPayments: number
  totalAmount: number
}

export interface PaymentByMethod {
  method: string
  count: number
  amount: number
}

export interface PaymentStats {
  byProgram: PaymentByProgram[]
  bySemester: PaymentBySemester[]
  byMethod: PaymentByMethod[]
}

export interface DateRange {
  start: Date
  end: Date
}
