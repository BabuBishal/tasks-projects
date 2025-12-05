import { parse } from 'csv-parse/sync'

export interface StudentCSVRow {
  name: string
  email: string
  program: string
  semester: string
  phone?: string
  address?: string
  scholarship?: string
}

export interface ValidationError {
  row: number
  field: string
  message: string
}

export interface ParseResult {
  data: StudentCSVRow[]
  errors: ValidationError[]
  valid: boolean
}

// Type for raw CSV record from parser
interface CSVRecord {
  name?: string
  email?: string
  program?: string
  semester?: string
  phone?: string
  address?: string
  scholarship?: string
}

/**
 * Parse CSV file content into student data
 */
export function parseCSV(fileContent: string): ParseResult {
  try {
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })

    const errors: ValidationError[] = []
    const data: StudentCSVRow[] = []

    ;(records as CSVRecord[]).forEach((record, index) => {
      const rowNumber = index + 2 // +2 because index is 0-based and row 1 is header

      // Validate required fields
      if (!record.name || record.name.trim() === '') {
        errors.push({
          row: rowNumber,
          field: 'name',
          message: 'Name is required',
        })
      }

      if (!record.email || record.email.trim() === '') {
        errors.push({
          row: rowNumber,
          field: 'email',
          message: 'Email is required',
        })
      } else if (!isValidEmail(record.email)) {
        errors.push({
          row: rowNumber,
          field: 'email',
          message: 'Invalid email format',
        })
      }

      if (!record.program || record.program.trim() === '') {
        errors.push({
          row: rowNumber,
          field: 'program',
          message: 'Program is required',
        })
      }

      if (!record.semester || record.semester.trim() === '') {
        errors.push({
          row: rowNumber,
          field: 'semester',
          message: 'Semester is required',
        })
      } else if (isNaN(Number(record.semester)) || Number(record.semester) < 1) {
        errors.push({
          row: rowNumber,
          field: 'semester',
          message: 'Semester must be a positive number',
        })
      }

      // Add to data array even if there are errors (for preview)
      data.push({
        name: record.name?.trim() || '',
        email: record.email?.trim() || '',
        program: record.program?.trim() || '',
        semester: record.semester?.trim() || '',
        phone: record.phone?.trim() || '',
        address: record.address?.trim() || '',
        scholarship: record.scholarship?.trim() || '',
      })
    })

    return {
      data,
      errors,
      valid: errors.length === 0,
    }
  } catch (error: unknown) {
    return {
      data: [],
      errors: [
        {
          row: 0,
          field: 'file',
          message: `Failed to parse CSV: ${(error as Error).message}`,
        },
      ],
      valid: false,
    }
  }
}

/**
 * Generate CSV template for student import
 */
export function generateCSVTemplate(): string {
  const headers = ['name', 'email', 'program', 'semester', 'phone', 'address', 'scholarship']
  const example = [
    'John Doe',
    'john@example.com',
    'BSc CSIT',
    '1',
    '9841234567',
    'Kathmandu',
    'Merit Scholarship',
  ]

  return `${headers.join(',')}\n${example.join(',')}`
}

// Type for student with fees for CSV export
interface StudentForExport {
  rollNo: string
  name: string
  email: string
  program?: { name: string }
  semester: number
  phone?: string
  address?: string
  fees?: {
    balance: number
    status: string
    createdAt: Date | string
  }[]
}

/**
 * Export students to CSV format
 */
export function exportToCSV(students: StudentForExport[]): string {
  const headers = [
    'Roll No',
    'Name',
    'Email',
    'Program',
    'Semester',
    'Phone',
    'Address',
    'Balance',
    'Status',
  ]

  const rows = students.map(student => {
    const totalBalance = student.fees?.reduce((sum, fee) => sum + fee.balance, 0) || 0

    const latestFee =
      student.fees && student.fees.length > 0
        ? student.fees.reduce((latest, fee) =>
            new Date(fee.createdAt) > new Date(latest.createdAt) ? fee : latest
          )
        : null

    return [
      student.rollNo,
      student.name,
      student.email,
      student.program?.name || '',
      student.semester,
      student.phone || '',
      student.address || '',
      totalBalance,
      latestFee?.status || 'No Fees',
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  return csvContent
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
