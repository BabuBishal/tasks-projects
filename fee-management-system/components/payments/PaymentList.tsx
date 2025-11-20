"use client";

import React, { useState, useMemo } from "react";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { Button } from "@/components/ui/button/Button";
import { Search, Filter, Download, Plus } from "lucide-react";
import Link from "next/link";
import { paymentHeaders } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Modal } from "@/components/ui/modal/Modal";
import jsPDF from "jspdf";

interface Payment {
  id: string;
  studentName: string;
  program: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

interface PaymentListProps {
  initialPayments: Payment[];
}

const PaymentList: React.FC<PaymentListProps> = ({ initialPayments }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [methodFilter, setMethodFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handler for downloading receipt as PDF
  const handleDownloadReceipt = (payment: Payment) => {
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
      ["Receipt No:", payment.id],
      ["Date:", formatDate(payment.date) || "-"],
      ["Student Name:", payment.studentName],
      ["Program:", payment.program],
      ["Payment Method:", payment.method],
      ["Status:", payment.status],
    ];

    let yPos = 35;
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, yPos);
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
    doc.text(`Rs ${payment.amount.toLocaleString()}`, 80, yPos);

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
    doc.save(`receipt-${payment.id}.pdf`);
  };

  // Handler for exporting all payments to CSV
  const handleExportPayments = () => {
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

  const filteredPayments = useMemo(() => {
    return initialPayments.filter((payment) => {
      const matchesSearch =
        payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter
        ? payment.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      const matchesMethod = methodFilter
        ? payment.method.toLowerCase() === methodFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [initialPayments, searchQuery, statusFilter, methodFilter]);

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number) => `Rs ${amount.toLocaleString()}`;

  return (
    <div className="w-full flex flex-col gap-5 p-6 border border-border rounded-lg bg-card">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-secondary text-lg font-semibold">
            Payment Management
          </span>
          <span className="text-xs text-muted">
            Manage and view all payment records
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExportPayments}>
            <Download className="w-4 h-4" /> Export
          </Button>
          <Link href={"/payments/add"}>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> New Payment
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by student name, ID..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
            value={methodFilter}
            onChange={(e) => {
              setMethodFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Methods</option>
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {/* Payment Table */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold text-secondary">
            Payment History ({initialPayments.length})
          </div>
          <div className="text-xs text-muted">
            Showing {paginatedPayments.length} of {filteredPayments.length}{" "}
            transactions
          </div>
        </div>

        {paginatedPayments.length > 0 ? (
          <Table
            className="rounded-md text-xs text-secondary"
            pagination={{
              pageSize: itemsPerPage,
              total: filteredPayments.length,
              onPageChange: setCurrentPage,
            }}
          >
            <Table.Header>
              <Table.Row>
                {paymentHeaders?.map((head, index) => (
                  <Table.Head key={index}>{head}</Table.Head>
                ))}
                <Table.Head>Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedPayments.map((payment) => (
                <Table.Row key={payment.id}>
                  <Table.Cell dataLabel="PaymentID">{payment.id}</Table.Cell>
                  <Table.Cell dataLabel="Student">
                    {payment.studentName}
                  </Table.Cell>
                  <Table.Cell dataLabel="Program">{payment.program}</Table.Cell>
                  <Table.Cell dataLabel="Amount">
                    {formatCurrency(payment.amount)}
                  </Table.Cell>
                  <Table.Cell dataLabel="Date">
                    {formatDate(payment.date) || "-"}
                  </Table.Cell>
                  <Table.Cell dataLabel="Method">
                    <span className="px-2 py-1 bg-background rounded text-xs border border-border">
                      {payment.method}
                    </span>
                  </Table.Cell>
                  <Table.Cell dataLabel="Status">
                    <Badge
                      size="small"
                      variant={
                        payment.status === "Partial"
                          ? "info"
                          : payment.status === "Paid"
                          ? "success"
                          : "danger"
                      }
                    >
                      {payment.status ?? "-"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell dataLabel="Actions">
                    <Modal>
                      <Modal.Trigger>Receipt</Modal.Trigger>
                      <Modal.Content>
                        <Modal.CloseIcon />
                        <Modal.Header>
                          <h2 className="text-xl font-bold text-primary">
                            Payment Receipt
                          </h2>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted font-medium">
                                Receipt No:
                              </span>
                              <span className="text-primary font-semibold">
                                {payment.id}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted font-medium">
                                Date:
                              </span>
                              <span className="text-primary">
                                {formatDate(payment.date)}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted font-medium">
                                Student Name:
                              </span>
                              <span className="text-primary">
                                {payment.studentName}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted font-medium">
                                Program:
                              </span>
                              <span className="text-primary">
                                {payment.program}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                              <span className="text-muted font-medium">
                                Payment Method:
                              </span>
                              <span className="text-primary capitalize">
                                {payment.method}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 ">
                              <span className="text-muted font-medium">
                                Status:
                              </span>
                              <Badge
                                size="small"
                                variant={
                                  payment.status === "Partial"
                                    ? "info"
                                    : payment.status === "Paid"
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between py-3 border-t-2 border-primary mt-4">
                              <span className="text-primary font-bold text-lg">
                                Amount Paid:
                              </span>
                              <span className="text-primary font-bold text-lg">
                                Rs {payment.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="flex gap-3">
                            <Modal.Close>Close</Modal.Close>
                            <Button
                              variant="primary"
                              className="flex-1"
                              onClick={() => handleDownloadReceipt(payment)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Filter className="w-12 h-12 text-muted mb-3" />
            <p className="text-muted text-sm mb-2">No payments found</p>
            <p className="text-xs text-muted">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
