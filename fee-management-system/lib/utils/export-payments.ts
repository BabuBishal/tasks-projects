import { PaymentHistoryItem } from "../types/api";
import { formatDate } from "./utils";

export const handleExportPayments = (
  filteredPayments: PaymentHistoryItem[]
) => {
  // Prepare CSV data
  const headers = [
    "Payment ID",
    "Student Name",
    "Program",
    "Amount",
    "Date",
    "Method",
    "Status",
  ];
  const csvData = filteredPayments.map((payment) => [
    payment.id,
    payment.studentName,
    payment.program,
    payment.amount,
    formatDate(payment.date) || "-",
    payment.method,
    payment.status,
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `payments-export-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
