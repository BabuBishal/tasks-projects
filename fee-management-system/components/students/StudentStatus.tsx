"use client";

import { StudentDetail } from "@/lib/@types/types";
import Badge from "../ui/Badges/Badges";
import { Button } from "../ui/Button/Button";
import { Download } from "lucide-react";

const StudentStatus = ({ studentDetail }: { studentDetail: StudentDetail }) => {
  const { semester, year, fees, paymentHistory } = studentDetail;

  const downloadReport = () => {
    const reportData = `
Student Fee Payment Receipt
=========================
Student Name: ${studentDetail?.name}
Program: ${studentDetail?.program}
Semester: ${semester}
Total Fees: ₹${fees.total}
Total Paid: ₹${fees.paid}
Total Pending: ₹${fees.balance}

Payment History:${
      paymentHistory.length > 0
        ? paymentHistory
            .map(
              (payment) => `
  - Date: ${payment.date}, Amount: ₹${payment.amount}, Method: ${payment.method}, Receipt No: ${payment.receiptNo}
`
            )
            .join("")
        : " No payments made yet."
    }
    `;

    const blob = new Blob([reportData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fee-receipt.txt";
    a.click();
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
