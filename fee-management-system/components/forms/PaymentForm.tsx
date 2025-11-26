"use client";
import { PaymentFormProps, Student } from "@/lib/types";
import { paymentMethod } from "@/lib/constants/constants";
import { useState } from "react";
import { Button } from "../ui/button/Button";

// Extended Student type with feesList for this component
type StudentWithFees = Student & {
  program?: string | { name: string };
  fees?: {
    paid?: number;
    balance?: number;
    totalOutstandingAll?: number;
  };
  feesList?: Array<{
    id: string;
    academicYear: string;
    semesterNo: number;
    originalFee: number;
    discount: number;
    payableFee: number;
    paid: number;
    balance: number;
    status: string;
    dueDate: string | null;
  }>;
};

export default function PaymentForm({
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
  students,
  setAmount,
  loading,
}: PaymentFormProps & {
  error: string;
  students: StudentWithFees[];
  setAmount?: (v: number) => void;
  loading: boolean;
}) {
  const [selectedFeeIds, setSelectedFeeIds] = useState<Set<string>>(new Set());

  const selectedStudent =
    formData.id && students.length > 0
      ? students.find((s) => String(s.id) === formData.id) || null
      : null;

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    handleChange({
      target: {
        name: "id",
        value: id,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setSelectedFeeIds(new Set());
    setAmount?.(0);
  };

  const handleToggleFee = (feeId: string) => {
    const newSelected = new Set(selectedFeeIds);
    if (newSelected.has(feeId)) {
      newSelected.delete(feeId);
    } else {
      newSelected.add(feeId);
    }
    setSelectedFeeIds(newSelected);

    // Calculate total amount from selected fees
    if (selectedStudent) {
      const total = Array.from(newSelected).reduce((sum, id) => {
        const fee = selectedStudent.feesList?.find((f) => f.id === id);
        return sum + (fee?.balance ?? 0);
      }, 0);
      setAmount?.(total);

      // Pass selected fee IDs to parent
      handleChange({
        target: {
          name: "selectedFeeIds",
          value: Array.from(newSelected).join(","),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleSelectAll = () => {
    if (!selectedStudent?.feesList) return;

    const unpaidFees = selectedStudent.feesList
      .filter((f) => f.balance > 0)
      .map((f) => f.id);

    setSelectedFeeIds(new Set(unpaidFees));

    const total = unpaidFees.reduce((sum, id) => {
      const fee = selectedStudent.feesList?.find((f) => f.id === id);
      return sum + (fee?.balance ?? 0);
    }, 0);
    setAmount?.(total);
  };

  const handleClearSelection = () => {
    setSelectedFeeIds(new Set());
    setAmount?.(0);
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-secondary text-background px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">Fee Payment</h2>
        <p className="text-zinc-100 dark:text-zinc-900 text-sm mt-1">
          Select student and semesters to pay
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-secondary">
            Select Student
          </label>
          <select
            className="w-full border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-accent transition-all"
            value={formData.id}
            name="id"
            onChange={(e) => {
              handleChange(e);
              handleStudentChange(e);
            }}
          >
            <option value="" disabled>
              Choose a student...
            </option>
            {students?.map((option: Student) => (
              <option key={option.id} value={option.id}>
                {option.rollNo} - {option.name}
              </option>
            ))}
          </select>
          {formErrors.id && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠</span> {formErrors.id}
            </p>
          )}
        </div>

        {/* Student Info Card */}
        {selectedStudent && (
          <div className="bg-accent  border-2 border-border rounded-lg p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Program
                </p>
                <p className="text-lg font-bold text-secondary">
                  {typeof selectedStudent.program === "string"
                    ? selectedStudent.program
                    : selectedStudent.program?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Current Semester
                </p>
                <p className="text-lg font-bold text-secondary">
                  Semester {selectedStudent.semester}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Roll Number
                </p>
                <p className="text-lg font-bold text-secondary">
                  {selectedStudent.rollNo}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Total Paid
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  Rs.{" "}
                  {Array.isArray(selectedStudent.fees)
                    ? "0"
                    : selectedStudent.fees?.paid?.toLocaleString() || "0"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Current Balance
                </p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  Rs.{" "}
                  {Array.isArray(selectedStudent.fees)
                    ? "0"
                    : selectedStudent.fees?.balance?.toLocaleString() || "0"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase">
                  Total Outstanding
                </p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  Rs.{" "}
                  {Array.isArray(selectedStudent.fees)
                    ? "0"
                    : selectedStudent.fees?.totalOutstandingAll?.toLocaleString() ||
                      "0"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fee Selection Table */}
        {selectedStudent &&
          selectedStudent.feesList &&
          selectedStudent.feesList.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-secondary">
                  Select Semesters to Pay
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-sm px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Select All Unpaid
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-sm px-4 py-2 bg-accent text-priimary rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              <div className="border-2 border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-accent border-b-2 border-border">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-secondary">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={
                              selectedStudent.feesList.filter(
                                (f) => f.balance > 0
                              ).length > 0 &&
                              selectedStudent.feesList
                                .filter((f) => f.balance > 0)
                                .every((f) => selectedFeeIds.has(f.id))
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleSelectAll();
                              } else {
                                handleClearSelection();
                              }
                            }}
                          />
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-secondary">
                          Academic Year
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-secondary">
                          Semester
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-secondary">
                          Original Fee
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-secondary">
                          Discount
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-secondary">
                          Payable
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-secondary">
                          Paid
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-secondary">
                          Balance
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-secondary">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-secondary">
                          Due Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedStudent.feesList.map((f) => {
                        const isSelected = selectedFeeIds.has(f.id);
                        const isPaid = f.balance <= 0;

                        return (
                          <tr
                            key={f.id}
                            className={`
                            ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-950 border-l-4 border-l-blue-500"
                                : ""
                            }
                            ${
                              isPaid
                                ? "bg-green-50 dark:bg-green-950 opacity-60"
                                : "hover:bg-gray-50 dark:hover:bg-zinc-800"
                            }
                            transition-colors cursor-pointer
                          `}
                            onClick={() => !isPaid && handleToggleFee(f.id)}
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                                checked={isSelected}
                                onChange={() => handleToggleFee(f.id)}
                                disabled={isPaid}
                              />
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {f.academicYear}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Sem {f.semesterNo}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600">
                              Rs. {f.originalFee.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right text-green-600 font-medium">
                              - Rs. {f.discount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold">
                              Rs. {f.payableFee.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right text-green-600">
                              Rs. {f.paid.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span
                                className={`font-bold ${
                                  f.balance > 0
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                Rs. {f.balance.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                ${
                                  f.status === "Paid"
                                    ? "bg-green-100 text-green-800"
                                    : ""
                                }
                                ${
                                  f.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : ""
                                }
                                ${
                                  f.status === "Overdue"
                                    ? "bg-red-100 text-red-800"
                                    : ""
                                }
                                ${
                                  f.status === "Partial"
                                    ? "bg-blue-100 text-blue-800"
                                    : ""
                                }
                              `}
                              >
                                {f.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-secondary ">
                              {f.dueDate
                                ? new Date(f.dueDate).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selected Summary */}
              {selectedFeeIds.size > 0 && (
                <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        {selectedFeeIds.size} semester
                        {selectedFeeIds.size > 1 ? "s" : ""} selected
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Array.from(selectedFeeIds)
                          .map((id) => {
                            const fee = selectedStudent.feesList?.find(
                              (f) => f.id === id
                            );
                            return fee
                              ? `Sem ${fee.semesterNo} (${fee.academicYear})`
                              : "";
                          })
                          .join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        Rs. {formData.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-secondary">
            Payment Method
          </label>
          <select
            className="w-full border-2 border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-accent transition-all"
            value={formData.method}
            name="method"
            onChange={handleChange}
          >
            <option value="" disabled>
              Select payment method...
            </option>
            {paymentMethod?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formErrors.method && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <span>⚠</span> {formErrors.method}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm font-medium flex items-center gap-2">
              <span className="text-xl">❌</span> {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={
              !selectedStudent ||
              selectedFeeIds.size === 0 ||
              formData.amount <= 0 ||
              loading
            }
            onClick={handleSubmit}
          >
            Process Payment - Rs. {formData.amount.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
}
