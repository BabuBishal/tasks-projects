"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Trash2, ArrowLeft, CreditCard, Award } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button/Button";
import StatsCard from "@/components/shared/stats-card/StatsCard";
import StudentInfo from "../_components/StudentInfo";
import { Student } from "@/lib/@types/types";
import Badge from "@/components/ui/badges/Badges";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { notify } = useToast();

  const lastRef = useInfiniteScrollObserver({
    enabled: !loading,
    onIntersect: () => console.log("last element reached."),
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/students/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch student");
        }

        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchStudent();
    }
  }, [params.id]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/students/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete student");
      }
      notify({ description: "Student deleted successfully", type: "success" });
      // alert("Student deleted successfully");
      router.push("/students");
    } catch (err) {
      notify({
        description:
          err instanceof Error ? err.message : "Failed to delete student",
        type: "error",
      });

      // alert(err instanceof Error ? err.message : "Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">{error || "Student not found"}</p>
        <Button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Students
        </Button>
      </div>
    );
  }

  const totalPaid = student.totalPaid || 0;
  const totalDue = student.totalBalance || 0;
  const totalScholarships = student.totalScholarshipAmount || 0;
  const totalPayable = student.totalPayableFee || 0;

  console.log("Student Data:", student);

  return (
    <div className="min-h-screen bg-background ">
      <div className="">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {student.name}
              </h1>
              <p className="text-muted">Roll No: {student.rollNo}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => router.push(`/students/${student.id}/edit`)}
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Modal>
              <Modal.Trigger className="flex gap-2 p-2  justify-center items-center bg-red-600 rounded-sm text-white hover:bg-red-500 hover:-translate-y-px dark:bg-red-400 transition-all">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </Modal.Trigger>
              <Modal.Content>
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this student? This action
                  cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Close className="hover:-translate-y-px">
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
            desc={`After ${formatCurrency(
              student.totalDiscount || 0
            )} discount`}
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
          <StudentInfo student={student} />

          {/* Fees & Payments */}
          <div className="lg:col-span-2 ">
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-primary mb-4">
                Fee Records
              </h2>
              {student.fees.length === 0 ? (
                <p className="text-muted text-center py-8">
                  No fee records found
                </p>
              ) : (
                <div className="space-y-5 max-h-[50vh] overflow-y-auto">
                  {student.fees.map((fee, index) => {
                    const isLast = index === student.fees?.length - 1;

                    return (
                      <div
                        ref={isLast ? lastRef : null}
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
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
