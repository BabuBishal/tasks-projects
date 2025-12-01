import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PaymentStats, DateRange } from '../_types'

/**
 * Formats a date as dd/mm/yyyy
 */
export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Generates a PDF report for payment statistics
 */
export const generatePaymentStatusReport = (
  paymentStats: PaymentStats,
  dateRange: DateRange,
  selectedPeriod: string
) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Title
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('Payment Status Report', pageWidth / 2, yPos, {
    align: 'center',
  })

  // Subtitle
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)

  doc.text(
    `Period: ${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`,
    pageWidth / 2,
    yPos,
    { align: 'center' }
  )

  yPos += 6
  const now = new Date()
  doc.text(`Generated on ${formatDate(now)} at ${now.toLocaleTimeString()}`, pageWidth / 2, yPos, {
    align: 'center',
  })

  doc.setTextColor(0)
  yPos += 15

  // Section 1: Payments by Program
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Payments by Program', 20, yPos)
  yPos += 10

  const programData = paymentStats.byProgram.map(p => [
    p.program,
    p.totalPayments.toString(),
    `Rs ${p.totalAmount.toLocaleString()}`,
  ])

  autoTable(doc, {
    startY: yPos,
    head: [['Program', 'Payments', 'Total Amount']],
    body: programData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
    margin: { left: 20, right: 20 },
    styles: { fontSize: 9 },
  })

  yPos = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

  // Section 2: Payments by Semester
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Payments by Semester', 20, yPos)
  yPos += 10

  const semesterData = paymentStats.bySemester.map(s => [
    `Semester ${s.semester}`,
    s.totalPayments.toString(),
    `Rs ${s.totalAmount.toLocaleString()}`,
  ])

  autoTable(doc, {
    startY: yPos,
    head: [['Semester', 'Total Payments', 'Total Amount']],
    body: semesterData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], fontStyle: 'bold' },
    margin: { left: 20, right: 20 },
  })

  yPos = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

  // Section 3: Payments by Method
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Payments by Method', 20, yPos)
  yPos += 10

  const methodData = paymentStats.byMethod.map(m => [
    m.method,
    m.count.toString(),
    `Rs ${m.amount.toLocaleString()}`,
  ])

  autoTable(doc, {
    startY: yPos,
    head: [['Payment Method', 'Count', 'Total Amount']],
    body: methodData,
    theme: 'grid',
    headStyles: { fillColor: [168, 85, 247], fontStyle: 'bold' },
    margin: { left: 20, right: 20 },
  })

  // Footer
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(150)
    doc.text(
      `Page ${i} of ${totalPages} | Fee Management System`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  doc.save(`payment-report-${selectedPeriod}.pdf`)
}
