"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import {
  Download,
  FileText,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  FileBarChart,
  WalletIcon,
  CreditCard,
  Banknote,
  PiggyBank,
  BanknoteX,
  Landmark,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import StatsCard from "@/components/ui/stats-card/StatsCard";

interface DashboardData {
  dashboardStats: {
    title: string;
    value: string;
    desc: string;
    icon: string;
  }[];
  paymentStats: {
    paid: number;
    partial: number;
    overdue: number;
    pending: number;
    total: number;
  };
}

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

type ReportType = "overview" | "payment-status";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("overview");

  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboardStats"],
      queryFn: async () => {
        const res = await fetch("/api/dashboard-stats");
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        return res.json();
      },
    });

  const { data: paymentStats, isLoading: paymentStatsLoading } =
    useQuery<PaymentStats>({
      queryKey: ["paymentStats"],
      queryFn: async () => {
        const res = await fetch("/api/reports/payment-stats");
        if (!res.ok) throw new Error("Failed to fetch payment stats");
        return res.json();
      },
    });

  const generateSystemOverviewReport = () => {
    if (!dashboardData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("System Overview Report", pageWidth / 2, yPos, {
      align: "center",
    });

    // Subtitle with date
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      pageWidth / 2,
      yPos,
      { align: "center" }
    );

    doc.setTextColor(0);
    yPos += 15;

    // Section 1: Overview Statistics
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Overview Statistics", 20, yPos);
    yPos += 10;

    const overviewData = [
      ["Total Revenue", dashboardData.dashboardStats[0]?.value || "Rs 0"],
      ["Total Students", dashboardData.dashboardStats[1]?.value || "0"],
      ["Pending Payments", dashboardData.dashboardStats[2]?.value || "Rs 0"],
      ["Collection Rate", dashboardData.dashboardStats[3]?.value || "0%"],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Metric", "Value"]],
      body: overviewData,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
    });

    yPos =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 15;

    // Section 2: Payment Status Breakdown
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Status Breakdown", 20, yPos);
    yPos += 10;

    const paymentData = [
      ["Paid", dashboardData.paymentStats.paid.toString()],
      ["Partial", dashboardData.paymentStats.partial.toString()],
      ["Pending", dashboardData.paymentStats.pending.toString()],
      ["Overdue", dashboardData.paymentStats.overdue.toString()],
      ["Total Fees", dashboardData.paymentStats.total.toString()],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Status", "Count"]],
      body: paymentData,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
    });

    yPos =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 15;

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

    doc.save(`system-overview-${new Date().toISOString().split("T")[0]}.pdf`);
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
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
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

    const programData = paymentStats.byProgram.map((p) => [
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

    const semesterData = paymentStats.bySemester.map((s) => [
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

    const methodData = paymentStats.byMethod.map((m) => [
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

    doc.save(`payment-status-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const isLoading = dashboardLoading || paymentStatsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dashboardData || !paymentStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load report data</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Reports", href: "/reports" }]} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Financial Reports
        </h1>
        <p className="text-muted-foreground">
          Generate comprehensive financial and payment status reports
        </p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedReport("overview")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedReport === "overview"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-lg ${
                selectedReport === "overview"
                  ? "bg-primary text-white"
                  : "bg-accent"
              }`}
            >
              <FileBarChart className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg text-primary mb-1">
                System Overview Report
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete system statistics including revenue, students, payment
                status, and overdue fees
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedReport("payment-status")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedReport === "payment-status"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-lg ${
                selectedReport === "payment-status"
                  ? "bg-primary text-white"
                  : "bg-accent"
              }`}
            >
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg text-primary mb-1">
                Payment Status Report
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed payment breakdowns by program, semester, and payment
                method
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Report Preview */}
      {selectedReport === "overview" && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-primary">
                System Overview Preview
              </h2>
            </div>
            <Button
              variant="primary"
              onClick={generateSystemOverviewReport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
          </div>

          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Total Revenue"
              value={dashboardData.dashboardStats[0]?.value || "Rs 0"}
              icon={DollarSign}
              description={
                dashboardData.dashboardStats[0]?.desc || "Total fees collected"
              }
              variant="success"
            />
            <StatsCard
              title="Total Students"
              value={dashboardData.dashboardStats[1]?.value || "0"}
              icon={Users}
              description={
                dashboardData.dashboardStats[1]?.desc ||
                "Total students enrolled"
              }
              variant="primary"
            />
            <StatsCard
              title="Pending Payments"
              value={dashboardData.dashboardStats[2]?.value || "Rs 0"}
              icon={Clock}
              description={
                dashboardData.dashboardStats[2]?.desc || "Awaiting Payments"
              }
              variant="warning"
            />
            <StatsCard
              title="Collection Rate"
              value={dashboardData.dashboardStats[3]?.value || "0%"}
              icon={CheckCircle}
              description={
                dashboardData.dashboardStats[3]?.desc || "Payment Success Rate"
              }
              variant="primary"
            />
          </div>

          {/* Payment Status Breakdown */}
          <div className="bg-accent/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Payment Status Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div className="bg-card p-3 rounded border border-border">
                <p className="text-muted-foreground text-xs">Paid</p>
                <p className="text-lg font-bold text-green-600">
                  {dashboardData.paymentStats.paid}
                </p>
              </div>
              <div className="bg-card p-3 rounded border border-border">
                <p className="text-muted-foreground text-xs">Partial</p>
                <p className="text-lg font-bold text-blue-600">
                  {dashboardData.paymentStats.partial}
                </p>
              </div>
              <div className="bg-card p-3 rounded border border-border">
                <p className="text-muted-foreground text-xs">Pending</p>
                <p className="text-lg font-bold text-yellow-600">
                  {dashboardData.paymentStats.pending}
                </p>
              </div>
              <div className="bg-card p-3 rounded border border-border">
                <p className="text-muted-foreground text-xs">Overdue</p>
                <p className="text-lg font-bold text-red-600">
                  {dashboardData.paymentStats.overdue}
                </p>
              </div>
              <div className="bg-card p-3 rounded border border-border">
                <p className="text-muted-foreground text-xs">Total</p>
                <p className="text-lg font-bold text-primary">
                  {dashboardData.paymentStats.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === "payment-status" && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-primary">
                Payment Status Preview
              </h2>
            </div>
            <Button
              variant="primary"
              onClick={generatePaymentStatusReport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate Report
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
                    {/* <th className="text-right p-3 font-semibold">Paid</th>
                    <th className="text-right p-3 font-semibold">Partial</th>
                    <th className="text-right p-3 font-semibold">Overdue</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paymentStats.byProgram.map((prog, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="p-3 font-medium">{prog.program}</td>
                      <td className="p-3 text-right">{prog.totalPayments}</td>
                      <td className="p-3 text-right">
                        Rs {prog.totalAmount.toLocaleString()}
                      </td>
                      {/* <td className="p-3 text-right text-green-600">
                        {prog.paidCount}
                      </td>
                      <td className="p-3 text-right text-blue-600">
                        {prog.partialCount}
                      </td>
                      <td className="p-3 text-right text-red-600">
                        {prog.overdueCount}
                      </td> */}
                    </tr>
                  ))}
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
              {paymentStats.bySemester.map((sem, idx) => (
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
            </div>
          </div>

          {/* Payments by Method */}
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-3">
              Payments by Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentStats.byMethod.map((method, idx) => (
                <div
                  key={idx}
                  className="bg-accent/50 p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-primary flex   items-center">
                      {method.method === "cash" ? (
                        <Banknote className="w-4 h-4 mr-2" />
                      ) : method.method.toLowerCase() === "bank" ? (
                        <Landmark className="w-4 h-4 mr-2" />
                      ) : method.method.toLowerCase() === "online" ? (
                        <CreditCard className="w-4 h-4 mr-2" />
                      ) : (
                        ""
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
