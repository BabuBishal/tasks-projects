import jsPDF from "jspdf";
import { formatDate } from "./utils";
import { PaymentHistoryItem } from "@/lib/types/api";

export const handleDownloadReceipt = (payment: Partial<PaymentHistoryItem>) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Receipt", 105, 20, { align: "center" });

  // Add horizontal line
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // Receipt details
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const details = [
    ["Receipt No:", payment.receiptNo || payment.id],
    ["Date:", formatDate(payment.date ?? "") || "-"],
    ["Student Name:", payment.studentName],
    ["Program:", `${payment.program}`],
    ["Payment Method:", payment.method],
    ["Status:", payment.status],
  ];

  let yPos = 35;
  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label ?? "", 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value ?? "", 80, yPos);
    yPos += 10;
  });

  // Add line before total
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 190, yPos);

  // Total amount
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Amount Paid:", 20, yPos);
  doc.text(`Rs ${payment?.amount?.toLocaleString()}`, 80, yPos);

  // Footer
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    105,
    280,
    { align: "center" }
  );

  // Save PDF
  doc.save(`receipt-${payment?.receiptNo || payment?.id}.pdf`);
};
