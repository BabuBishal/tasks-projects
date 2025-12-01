import autoTable from 'jspdf-autotable'
import { formatCurrency, formatDate } from './utils'
import { StudentWithComputedTotals } from '../types'
import jsPDF from 'jspdf'

export const handleDownloadFeeRecord = ({
  student,
  totalPayable,
  totalPaid,
  totalDue,
  totalScholarships,
}: {
  student: StudentWithComputedTotals
  totalPayable: number
  totalPaid: number
  totalDue: number
  totalScholarships: number
}) => {
  if (!student) return
  console.log(student)
  const doc = new jsPDF()

  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Fee Record', pageWidth / 2, yPos, { align: 'center' })

  // Student Info
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    pageWidth / 2,
    yPos,
    { align: 'center' }
  )

  doc.setTextColor(0)
  yPos += 15

  // Student Details
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Student Information', 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const studentInfo = [
    ['Name:', student.name],
    ['Roll No:', student.rollNo],
    ['Program:', student.program.name],
    ['Current Semester:', student.semester.toString()],
    ['Email:', student.email],
    ['Phone:', student.phone],
  ]

  studentInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold')
    doc.text(label, 20, yPos)
    doc.setFont('helvetica', 'normal')
    doc.text(value, 60, yPos)
    yPos += 6
  })

  yPos += 10

  // Fee Summary
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Fee Summary', 20, yPos)
  yPos += 8

  const summaryData = [
    ['Total Payable', formatCurrency(totalPayable)],
    ['Total Paid', formatCurrency(totalPaid)],
    ['Balance Due', formatCurrency(totalDue)],
    ['Scholarship', formatCurrency(totalScholarships)],
  ]

  autoTable(doc, {
    startY: yPos,
    head: [['Description', 'Amount']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
    margin: { left: 20, right: 20 },
  })

  yPos = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15

  // Fee Records Details
  if (student.fees && student.fees.length > 0) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Detailed Fee Records', 20, yPos)
    yPos += 10

    student.fees.forEach(fee => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      // Fee header
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`Semester Fee - ${fee.academicYear}`, 20, yPos)
      yPos += 6

      // Fee details
      const feeDetailsData = [
        ['Original Fee', formatCurrency(fee.originalFee)],
        ['Discount', formatCurrency(fee.discount)],
        ['Payable Fee', formatCurrency(fee.payableFee)],
        ['Paid', formatCurrency(fee.paid)],
        ['Balance', formatCurrency(fee.balance)],
        ['Status', fee.status],
        ['Due Date', formatDate(fee.dueDate)],
      ]

      autoTable(doc, {
        startY: yPos,
        body: feeDetailsData,
        theme: 'plain',
        margin: { left: 25, right: 20 },
        styles: { fontSize: 9 },
      })

      yPos = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5

      // Payment history for this fee
      if (fee.payments && fee.payments.length > 0) {
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text('Payment History:', 25, yPos)
        yPos += 5

        const paymentData = fee.payments.map(p => [
          formatDate(p.date),
          formatCurrency(p.amount),
          p.method,
          p.receiptNo,
        ])

        autoTable(doc, {
          startY: yPos,
          head: [['Date', 'Amount', 'Method', 'Receipt No']],
          body: paymentData,
          theme: 'striped',
          headStyles: {
            fillColor: [34, 197, 94],
            fontStyle: 'bold',
            fontSize: 9,
          },
          margin: { left: 25, right: 20 },
          styles: { fontSize: 8 },
        })

        yPos = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
      } else {
        yPos += 5
      }
    })
  }

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

  // Save PDF
  doc.save(`fee-record-${student.rollNo}-${new Date().toISOString().split('T')[0]}.pdf`)
}
