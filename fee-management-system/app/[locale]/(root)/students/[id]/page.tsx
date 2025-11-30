"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Pencil,
  Trash2,
  CreditCard,
  Award,
  ArrowRight,
  Download,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button/Button";
import StatsCard from "@/components/shared/stats-card/StatsCard";
import StudentInfo from "../_components/StudentInfo";
// import { StudentWithComputedTotals } from "@/lib/types";
import Badge from "@/components/ui/badges/Badges";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
// import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import { StudentDetailsSkeleton } from "./_components/StudentDetailsSkeleton";
import {
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
  usePromoteSemesterMutation,
} from "@/hooks/query-hooks/students";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { notify } = useToast();

  const id = params?.id;
  // console.log("id", id);

  const { mutateAsync: deleteStudent, isPending: deleteLoading } =
    useDeleteStudentMutation();

  const { mutateAsync: promoteMutation, isPending: promoteLoading } =
    usePromoteSemesterMutation();

  const { data: student, isLoading, error } = useGetStudentByIdQuery(id);
  console.log("studentData", student);

  const handleDelete = async () => {
    try {
      await deleteStudent({ id });

      notify({ description: "Student deleted successfully", type: "success" });
      // alert("Student deleted successfully");
      router.push("/students");
    } catch (err) {
      notify({
        description:
          err instanceof Error ? err.message : "Failed to delete student",
        type: "error",
      });
      router.push(`/students/${id}`);
      // alert(err instanceof Error ? err.message : "Failed to delete student");
    } finally {
      // setDeleteLoading(false);
    }
  };

  const handlePromote = async () => {
    if (!student) return;
    try {
      // setPromoteLoading(true);
      const { message } = await promoteMutation({
        studentIds: [student.id],
      });

       notify({
            description:
              message || "Student graduated successfully!",
            type: "success",
          });
      // const successResult = success?.find((s) => s.studentId === student.id);

      // const response = await fetch("/api/students/promote-semester", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ studentIds: [student.id] }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.error || "Failed to promote student");
      // }

      // const successResult = data.results.success.find(
      //   (s: any) => s.studentId === student.id
      // );

      // if (success && success.length > 0) {
      //   if (successResult?.isGraduated) {
      //     notify({
      //       description:
      //         successResult?.message || "Student graduated successfully!",
      //       type: "success",
      //     });
      //   } else {
      //     notify({
      //       description: "Student promoted successfully!",
      //       type: "success",
      //     });
      //   }
        // Refresh data
        // window.location.reload();
      // } else if (failed && failed.length > 0) {
      //   const errorResult = failed?.find((s) => s.studentId === student.id);
      //   throw new Error(errorResult?.error || "Failed to promote student");
      // }
    } catch (err) {
      notify({
        description:
          err instanceof Error ? err.message : "Failed to promote student",
        type: "error",
      });
    } finally {
      // setPromoteLoading(false);
    }
  };

  const handleDownloadFeeRecord = () => {
    if (!student) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Record", pageWidth / 2, yPos, { align: "center" });

    // Student Info
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

    // Student Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Student Information", 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const studentInfo = [
      ["Name:", student.name],
      ["Roll No:", student.rollNo],
      ["Program:", student.program.name],
      ["Current Semester:", student.semester.toString()],
      ["Email:", student.email],
      ["Phone:", student.phone],
    ];

    studentInfo.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(value, 60, yPos);
      yPos += 6;
    });

    yPos += 10;

    // Fee Summary
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Fee Summary", 20, yPos);
    yPos += 8;

    const summaryData = [
      ["Total Payable", formatCurrency(totalPayable)],
      ["Total Paid", formatCurrency(totalPaid)],
      ["Balance Due", formatCurrency(totalDue)],
      ["Scholarship", formatCurrency(totalScholarships)],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Description", "Amount"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], fontStyle: "bold" },
      margin: { left: 20, right: 20 },
    });

    yPos =
      (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 15;

    // Fee Records Details
    if (student.fees && student.fees.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Fee Records", 20, yPos);
      yPos += 10;

      student.fees.forEach((fee) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        // Fee header
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`Semester Fee - ${fee.academicYear}`, 20, yPos);
        yPos += 6;

        // Fee details
        const feeDetailsData = [
          ["Original Fee", formatCurrency(fee.originalFee)],
          ["Discount", formatCurrency(fee.discount)],
          ["Payable Fee", formatCurrency(fee.payableFee)],
          ["Paid", formatCurrency(fee.paid)],
          ["Balance", formatCurrency(fee.balance)],
          ["Status", fee.status],
          ["Due Date", formatDate(fee.dueDate)],
        ];

        autoTable(doc, {
          startY: yPos,
          body: feeDetailsData,
          theme: "plain",
          margin: { left: 25, right: 20 },
          styles: { fontSize: 9 },
        });

        yPos =
          (doc as typeof doc & { lastAutoTable: { finalY: number } })
            .lastAutoTable.finalY + 5;

        // Payment history for this fee
        if (fee.payments && fee.payments.length > 0) {
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.text("Payment History:", 25, yPos);
          yPos += 5;

          const paymentData = fee.payments.map((p) => [
            formatDate(p.date),
            formatCurrency(p.amount),
            p.method,
            p.receiptNo,
          ]);

          autoTable(doc, {
            startY: yPos,
            head: [["Date", "Amount", "Method", "Receipt No"]],
            body: paymentData,
            theme: "striped",
            headStyles: {
              fillColor: [34, 197, 94],
              fontStyle: "bold",
              fontSize: 9,
            },
            margin: { left: 25, right: 20 },
            styles: { fontSize: 8 },
          });

          yPos =
            (doc as typeof doc & { lastAutoTable: { finalY: number } })
              .lastAutoTable.finalY + 10;
        } else {
          yPos += 5;
        }
      });
    }

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

    // Save PDF
    doc.save(
      `fee-record-${student.rollNo}-${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };

  if (isLoading) {
    return <StudentDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">
          {error.message || "Student not found"}
        </p>
        <Button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Students
        </Button>
      </div>
    );
  }

  const totalPaid = student?.totalPaid || 0;
  const totalDue = student?.totalBalance || 0;
  const totalScholarships = student?.totalScholarshipAmount || 0;
  const totalPayable = student?.totalPayableFee || 0;

  console.log("Student Data:", student);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Students", href: "/students" },
          {
            label: student?.name || "Student",
            href: `/students/${student?.id}`,
          },
        ]}
      />
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {student?.name}
          </h1>
          <p className="text-muted-foreground">Roll No: {student?.rollNo}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={handlePromote}
            disabled={promoteLoading || student?.status === "Graduated"}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowRight className="w-4 h-4" />
            {promoteLoading ? "Promoting..." : "Promote"}
          </Button>

          <Button
            variant="primary"
            disabled={student?.status === "Graduated"}
            onClick={() => router.push(`/students/${student?.id}/edit`)}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <Modal>
            <Modal.Trigger className="flex gap-2 p-2  justify-center items-center bg-red-600! rounded-sm text-white! hover:bg-red-500 hover:-translate-y-px dark:bg-red-400 transition-all">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header>Confirm Deletion</Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this student? This action cannot
                be undone.
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close className="hover:-translate-y-px w-fit! ">
                  Cancel
                </Modal.Close>
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleteLoading ? "Deleting..." : "Delete"}
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title={"Total Payable"}
          amount={formatCurrency(totalPayable)}
          desc={`After ${formatCurrency(student?.totalDiscount || 0)} discount`}
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </StatsCard>
        <StatsCard title={"Total Paid"} amount={formatCurrency(totalPaid)}>
          <div className="p-2 bg-green-100 dark:bg-green-950 rounded-lg">
            <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        </StatsCard>
        <StatsCard title={"Balance Due"} amount={formatCurrency(totalDue)}>
          <div className="p-2 bg-red-100 dark:bg-red-950 rounded-lg">
            <CreditCard className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
        </StatsCard>
        <StatsCard
          title={"Scholarship"}
          amount={formatCurrency(totalScholarships)}
        >
          <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
        </StatsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Information */}
        {student && <StudentInfo student={student} />}

        {/* Fees & Payments */}
        <div className="lg:col-span-2 ">
          <div className="bg-card rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Fee Records</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadFeeRecord}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
            {student &&
            Array.isArray(student.fees) &&
            student.fees.length === 0 ? (
              <p className="text-muted text-center py-8">
                No fee records found
              </p>
            ) : (
              <div className="space-y-5 max-h-[50vh] overflow-y-auto">
                {student &&
                  Array.isArray(student.fees) &&
                  student.fees.map((fee) => {
                    return (
                      <div
                        key={fee.id}
                        className="border border-border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-primary">
                              Semester Fee
                            </h3>
                            <p className="text-sm text-muted">
                              {fee.academicYear} • Due:{" "}
                              {formatDate(fee.dueDate)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              fee.status.toLowerCase() === "paid"
                                ? "success"
                                : fee.status.toLowerCase() === "pending"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {fee.status.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Fee Structure Breakdown */}
                        <div className="mb-4 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                          <h4 className="text-sm font-semibold text-secondary mb-2">
                            Fee Structure
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Tuition:</span>
                              <span className="font-medium">
                                {fee.feeStructure.tuitionFee &&
                                  formatCurrency(fee.feeStructure.tuitionFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Lab:</span>
                              <span className="font-medium">
                                {fee.feeStructure.labFee &&
                                  formatCurrency(fee.feeStructure.labFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Library:</span>
                              <span className="font-medium">
                                {fee.feeStructure.libraryFee &&
                                  formatCurrency(fee.feeStructure.libraryFee)}
                              </span>
                            </div>
                            <div className="flex justify-start gap-5">
                              <span className="text-muted">Sports:</span>
                              <span className="font-medium">
                                {fee.feeStructure.sportsFee &&
                                  formatCurrency(fee.feeStructure.sportsFee)}
                              </span>
                            </div>
                            <div className="flex gap-5 justify-start">
                              <span className="text-muted">Misc:</span>
                              <span className="font-medium">
                                {fee.feeStructure.miscFee &&
                                  formatCurrency(fee.feeStructure.miscFee)}
                              </span>
                            </div>
                            {/* <div className="flex justify-between font-semibold border-t pt-2">
                          <span className="text-gray-700">Total:</span>
                          <span className="text-gray-900">
                            {formatCurrency(fee.feeStructure.totalFee)}
                          </span>
                        </div> */}
                          </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="grid grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted">Original Fee</p>
                            <p className="font-semibold text-primary">
                              {formatCurrency(fee.originalFee)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted">Payable</p>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              {formatCurrency(fee.payableFee)}
                            </p>
                            {fee.discount > 0 && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                -{formatCurrency(fee.discount)}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Paid
                            </p>
                            <p className="font-semibold text-green-600 dark:text-green-400">
                              {formatCurrency(fee.paid)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Balance
                            </p>
                            <p className="font-semibold text-red-600 dark:text-red-400">
                              {formatCurrency(fee.balance)}
                            </p>
                          </div>
                        </div>

                        {/* Payment History */}
                        {fee.payments.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <h4 className="text-sm font-semibold text-secondary mb-2">
                              Payment History
                            </h4>
                            <div className="space-y-2">
                              {fee.payments.map((payment) => (
                                <div
                                  key={payment.id}
                                  className="flex items-center justify-between text-sm bg-zinc-100 dark:bg-zinc-800 p-3 rounded"
                                >
                                  <div>
                                    <p className="text-primary font-medium">
                                      {formatCurrency(payment.amount)}
                                    </p>
                                    <p className="text-xs text-muted">
                                      {formatDate(payment.date)} •{" "}
                                      {payment.method}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    {payment.receiptNo && (
                                      <p className="text-sm text-muted mt-1">
                                        Receipt: {payment.receiptNo}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Make Payment Button - Show only if there's a balance */}
                        {fee.balance > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <Button
                              variant="primary"
                              size="sm"
                              className="w-full flex items-center justify-center gap-2"
                              onClick={() =>
                                router.push(
                                  `/payments/add?studentId=${student.id}`
                                )
                              }
                            >
                              <CreditCard className="w-4 h-4" />
                              Make Payment
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
