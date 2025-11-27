"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import {
  Download,
  BarChart3,
  Calendar,
  CreditCard,
  Banknote,
  Landmark,
  ChevronDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetPaymentReportStatsQuery } from "@/hooks/query-hooks/reports";

interface PaymentStats {
  byProgram: {
    program: string;
    totalPayments: number;
    totalAmount: number;
    paidCount: number;
    partialCount: number;
    pendingCount: number;
    overdueCount: number;
  }[];
  bySemester: {
    semester: number;
    totalPayments: number;
    totalAmount: number;
  }[];
  byMethod: {
    method: string;
    count: number;
    amount: number;
  }[];
}

type TimeFrame = "monthly" | "quarterly" | "half-yearly" | "yearly";

export default function ReportsPage() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });
  console.log("🚀 ~ ReportsPage ~ selectedPeriod:", selectedPeriod);

  // Calculate date range based on selection
  const dateRange = useMemo(() => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (timeFrame === "monthly") {
      // selectedPeriod is YYYY-MM
      const [year, month] = selectedPeriod.split("-").map(Number);
      start = new Date(year, month - 1, 1);
      end = new Date(year, month, 0); // Last day of month
    } else if (timeFrame === "quarterly") {
      // selectedPeriod is YYYY-Qx
      const [yearStr, quarterStr] = selectedPeriod.split("-");
      const year = parseInt(yearStr);
      const quarter = parseInt(quarterStr.replace("Q", ""));
      start = new Date(year, (quarter - 1) * 3, 1);
      end = new Date(year, quarter * 3, 0);
    } else if (timeFrame === "half-yearly") {
      // selectedPeriod is YYYY-Hx
      const [yearStr, halfStr] = selectedPeriod.split("-");
      const year = parseInt(yearStr);
      const half = parseInt(halfStr.replace("H", ""));
      start = new Date(year, (half - 1) * 6, 1);
      end = new Date(year, half * 6, 0);
    } else if (timeFrame === "yearly") {
      // selectedPeriod is YYYY
      const year = parseInt(selectedPeriod);
      start = new Date(year, 0, 1);
      end = new Date(year, 11, 31);
    }

    // Set times to start/end of day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  }, [timeFrame, selectedPeriod]);

  const { data: paymentStats, isLoading } = useGetPaymentReportStatsQuery({
    startDate: dateRange.start.toISOString(),
    endDate: dateRange.end.toISOString(),
  });

  // Generate options for selectors
  const periodOptions = useMemo(() => {
    const options = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    if (timeFrame === "monthly") {
      for (let i = 0; i < 12; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const value = `${year}-${month}`;
        const label = d.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
        options.push({ value, label });
      }
    } else if (timeFrame === "quarterly") {
      for (let year = currentYear; year >= currentYear - 1; year--) {
        for (let q = 4; q >= 1; q--) {
          if (year === currentYear && q > Math.ceil((today.getMonth() + 1) / 3))
            continue;
          options.push({ value: `${year}-Q${q}`, label: `Q${q} ${year}` });
        }
      }
    } else if (timeFrame === "half-yearly") {
      for (let year = currentYear; year >= currentYear - 1; year--) {
        for (let h = 2; h >= 1; h--) {
          if (year === currentYear && h > Math.ceil((today.getMonth() + 1) / 6))
            continue;
          options.push({ value: `${year}-H${h}`, label: `H${h} ${year}` });
        }
      }
    } else if (timeFrame === "yearly") {
      for (let i = 0; i < 3; i++) {
        const year = currentYear - i;
        options.push({ value: `${year}`, label: `${year}` });
      }
    }
    return options;
  }, [timeFrame]);

  // Update selected period when timeframe changes
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value as TimeFrame);
    // Reset to current/latest period for the new timeframe
    if (value === "monthly") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      setSelectedPeriod(`${year}-${month}`);
    } else if (value === "quarterly") {
      const q = Math.ceil((new Date().getMonth() + 1) / 3);
      setSelectedPeriod(`${new Date().getFullYear()}-Q${q}`);
    } else if (value === "half-yearly") {
      const h = Math.ceil((new Date().getMonth() + 1) / 6);
      setSelectedPeriod(`${new Date().getFullYear()}-H${h}`);
    } else if (value === "yearly") {
      setSelectedPeriod(`${new Date().getFullYear()}`);
    }
  };

  const generatePaymentStatusReport = () => {
    if (!paymentStats) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Status Report", pageWidth / 2, yPos, {
      align: "center",
    });

    // Subtitle
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);

    // Format dates as dd/mm/yyyy
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    doc.text(
      `Period: ${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`,
      pageWidth / 2,
      yPos,
      { align: "center" }
    );

    yPos += 6;
    const now = new Date();
    doc.text(
      `Generated on ${formatDate(now)} at ${now.toLocaleTimeString()}`,
      pageWidth / 2,
      yPos,
      { align: "center" }
    );

    doc.setTextColor(0);
    yPos += 15;

    // Section 1: Payments by Program
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payments by Program", 20, yPos);
    yPos += 10;

    const programData = (paymentStats as PaymentStats).byProgram.map((p) => [
      p.program,
      p.totalPayments.toString(),
      `Rs ${p.totalAmount.toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [["Program", "Payments", "Total Amount"]],
      body: programData,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
      styles: { fontSize: 9 },
    });

    yPos =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 15;

    // Section 2: Payments by Semester
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payments by Semester", 20, yPos);
    yPos += 10;

    const semesterData = (paymentStats as PaymentStats).bySemester.map((s) => [
      `Semester ${s.semester}`,
      s.totalPayments.toString(),
      `Rs ${s.totalAmount.toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [["Semester", "Total Payments", "Total Amount"]],
      body: semesterData,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
    });

    yPos =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 15;

    // Section 3: Payments by Method
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payments by Method", 20, yPos);
    yPos += 10;

    const methodData = (paymentStats as PaymentStats).byMethod.map((m) => [
      m.method,
      m.count.toString(),
      `Rs ${m.amount.toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [["Payment Method", "Count", "Total Amount"]],
      body: methodData,
      theme: "grid",
      headStyles: { fillColor: [168, 85, 247], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
    });

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${totalPages} | Fee Management System`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save(`payment-report-${selectedPeriod}.pdf`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Reports", href: "/reports" }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Financial Reports
          </h1>
          <p className="text-muted-foreground">
            Generate time-based payment status reports
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={timeFrame}
              onChange={(e) => handleTimeFrameChange(e.target.value)}
              className="appearance-none w-[140px] h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="half-yearly">Half Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none w-[180px] h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : !paymentStats ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-destructive">Failed to load report data</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-primary">
                Report Preview: {dateRange.start.toLocaleDateString("en-GB")} -{" "}
                {dateRange.end.toLocaleDateString("en-GB")}
              </h2>
            </div>
            <Button
              variant="primary"
              onClick={generatePaymentStatusReport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate PDF
            </Button>
          </div>

          {/* Payments by Program */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-secondary mb-3">
              Payments by Program
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left p-3 font-semibold">Program</th>
                    <th className="text-right p-3 font-semibold">Payments</th>
                    <th className="text-right p-3 font-semibold">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(paymentStats as PaymentStats).byProgram.map((prog, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="p-3 font-medium">{prog.program}</td>
                      <td className="p-3 text-right">{prog.totalPayments}</td>
                      <td className="p-3 text-right">
                        Rs {prog.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {(paymentStats as PaymentStats).byProgram.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-muted-foreground"
                      >
                        No payments found for this period
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments by Semester */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-secondary mb-3">
              Payments by Semester
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(paymentStats as PaymentStats).bySemester.map((sem, idx) => (
                <div
                  key={idx}
                  className="bg-accent/50 p-4 rounded-lg border border-border"
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    Semester {sem.semester}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {sem.totalPayments}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rs {sem.totalAmount.toLocaleString()}
                  </p>
                </div>
              ))}
              {(paymentStats as PaymentStats).bySemester.length === 0 && (
                <div className="col-span-full p-4 text-center text-muted-foreground bg-accent/20 rounded">
                  No payments found for this period
                </div>
              )}
            </div>
          </div>

          {/* Payments by Method */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-3">
              Payments by Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(paymentStats as PaymentStats).byMethod.map((method, idx) => (
                <div
                  key={idx}
                  className="bg-accent/50 p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-primary flex items-center">
                      {method.method.toLowerCase() === "cash" ? (
                        <Banknote className="w-4 h-4 mr-2" />
                      ) : method.method.toLowerCase().includes("bank") ? (
                        <Landmark className="w-4 h-4 mr-2" />
                      ) : (
                        <CreditCard className="w-4 h-4 mr-2" />
                      )}
                      {method.method}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {method.count}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rs {method.amount.toLocaleString()}
                  </p>
                </div>
              ))}
              {(paymentStats as PaymentStats).byMethod.length === 0 && (
                <div className="col-span-full p-4 text-center text-muted-foreground bg-accent/20 rounded">
                  No payments found for this period
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
