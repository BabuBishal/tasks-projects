"use client";

import { StudentDetail } from "@/lib/@types/types";
import Badge from "../ui/badges/Badges";
import { Button } from "../ui/button/Button";
import { Download } from "lucide-react";

const StudentStatus = ({ studentDetail }: { studentDetail: StudentDetail }) => {
  const { semester, year, fees, paymentHistory } = studentDetail;

  const downloadReport = () => {
    const fmt = (n: number) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(n);

    const total = Number(fees.total || 0);
    const paid = Number(fees.paid || 0);
    const balance = Number(fees.balance || 0);

    const paymentCount = paymentHistory?.length || 0;
    const lastPayment = paymentCount > 0 ? paymentHistory[0] : null;

    const percentPaid =
      total > 0 ? Math.round((paid / total) * 10000) / 100 : 0;

    let dueInfo = "N/A";
    if (fees.dueDate) {
      const due = new Date(fees.dueDate);
      const today = new Date();
      const diffMs = due.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      dueInfo = `${fees.dueDate} (${
        diffDays >= 0
          ? `${diffDays} days left`
          : `${Math.abs(diffDays)} days overdue`
      })`;
    }

    // methods breakdown
    const methods: Record<string, number> = {};
    paymentHistory.forEach((p) => {
      methods[p.method] = (methods[p.method] || 0) + Number(p.amount || 0);
    });

    const now = new Date().toLocaleString();
    const lines: string[] = [];
    lines.push("STUDENT FEE REPORT");
    lines.push(`Generated: ${now}`);
    lines.push("----------------------------------------");
    lines.push(`Student ID : ${studentDetail?.id || "N/A"}`);
    lines.push(`Name       : ${studentDetail?.name || "N/A"}`);
    lines.push(`Roll No    : ${studentDetail?.rollNo || "N/A"}`);
    lines.push(`Program    : ${studentDetail?.program || "N/A"}`);
    lines.push(`Semester   : ${semester}    Year: ${year}`);
    lines.push("");
    lines.push("SUMMARY");
    lines.push(`Total Fees : ${fmt(total)}`);
    lines.push(`Total Paid : ${fmt(paid)} (${percentPaid}%)`);
    lines.push(`Balance    : ${fmt(balance)}`);
    lines.push(`Status     : ${fees.status || "N/A"}`);
    lines.push(`Due Date   : ${dueInfo}`);
    lines.push("");
    lines.push("PAYMENT METHODS BREAKDOWN:");
    if (Object.keys(methods).length > 0) {
      Object.entries(methods).forEach(([m, amt]) =>
        lines.push(`  - ${m}: ${fmt(amt)}`)
      );
    } else {
      lines.push("  No payments recorded");
    }

    lines.push("");
    lines.push(`Number of Payments: ${paymentCount}`);
    if (lastPayment) {
      lines.push(
        `Last Payment Date : ${lastPayment.date} (${fmt(
          Number(lastPayment.amount)
        )})`
      );
    }

    lines.push("\nDETAILED PAYMENT HISTORY:");
    if (paymentCount > 0) {
      lines.push(
        "Date       | Amount     | Method       | Receipt No | Status"
      );
      lines.push("-----------------------------------------------------------");
      paymentHistory.forEach((p) => {
        lines.push(
          `${p.date} | ${fmt(Number(p.amount)).padEnd(10)} | ${p.method.padEnd(
            12
          )} | ${p.receiptNo} | ${p.status || ""}`
        );
      });
    } else {
      lines.push("No payment history available.");
    }

    const reportData = lines.join("\n");

    const blob = new Blob([reportData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fee-report-${studentDetail?.id || "student"}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="w-full flex flex-col gap-4 p-4 border border-border rounded-md">
      <div className="text-md text-secondary font-semibold">
        <div className="text-md text-primary">
          Current Semester Payment Status
        </div>
        <div className="text-sm text-muted ">{`Semseter ${semester} - Year ${year}`}</div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between  gap-2">
          <div className="text-sm text-secondary ">Total Amount</div>
          <div className="text-sm text-muted">{`$ ${fees.total}`}</div>
        </div>
        <div className="flex justify-between  gap-2">
          <div className="text-sm text-secondary ">Due Date</div>
          <div className="text-sm text-muted">{`${fees.dueDate}`}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-secondary font-semibold">
            Payment History
          </div>
          {paymentHistory.map((payment) => (
            <div
              key={payment.receiptNo}
              className="flex justify-between  gap-2"
            >
              <div className="text-sm text-secondary ">
                {`Date: ${payment.date} | Receipt No: ${payment.receiptNo}| ${payment.method}`}
              </div>
              <div className="text-sm text-muted">{`$ ${payment.amount}`}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted">Payment Status</div>
          <Badge className="bg-primary text-background border border-border text-xs">
            {fees.status}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-secondary font-semibold">Amount</div>
          <div className="text-sm text-muted font-semibold">{`$ ${fees.paid}`}</div>
        </div>
      </div>
      <Button variant="primary" className=" text-xs" onClick={downloadReport}>
        <Download className="w-4 h-4" />
        Download Receipt
      </Button>
    </div>
  );
};

export default StudentStatus;
