"use client";
import { PaymentFormProps, Student } from "@/lib/@types/types";
import { paymentMethod } from "@/lib/constants";
import { useState } from "react";
import { Button } from "../ui/Button/Button";

export default function PaymentForm({
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
  students,
  setAmount,
}: PaymentFormProps & {
  error: string;
  students: Student[];
  setAmount?: (v: number) => void;
}) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedFeeIds, setSelectedFeeIds] = useState<Set<string>>(new Set());

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const student = students.find((s) => String(s.id) === id) || null;
    setSelectedStudent(student);
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
      } as any);
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

  console.log("selected", selectedStudent);
  // const resetForm = () => {
  //   setSelectedStudent(null);
  //   setSelectedFeeIds(new Set());
  //   setAmount?.(0);
  // };

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-zinc-900 to-zinc-800 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">Fee Payment</h2>
        <p className="text-blue-100 text-sm mt-1">
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
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Program
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedStudent.program}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Current Semester
                </p>
                <p className="text-lg font-bold text-gray-800">
                  Semester {selectedStudent.semester}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Roll Number
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {selectedStudent.rollNo}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Total Paid
                </p>
                <p className="text-lg font-bold text-green-600">
                  Rs. {selectedStudent.fees?.paid?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Current Balance
                </p>
                <p className="text-lg font-bold text-orange-600">
                  Rs. {selectedStudent.fees?.balance?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium uppercase">
                  Total Outstanding
                </p>
                <p className="text-lg font-bold text-red-600">
                  Rs.{" "}
                  {selectedStudent.fees?.totalOutstandingAll?.toLocaleString()}
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
                    className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Select All Unpaid
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-sm px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              <div className="border-2 border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b-2 border-border">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
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
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Academic Year
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Semester
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">
                          Original Fee
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">
                          Discount
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">
                          Payable
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">
                          Paid
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">
                          Balance
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
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
                                ? "bg-blue-50 border-l-4 border-l-blue-500"
                                : ""
                            }
                            ${
                              isPaid
                                ? "bg-green-50 opacity-60"
                                : "hover:bg-gray-50"
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
                            <td className="px-4 py-3 text-sm text-gray-600">
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
              formData.amount <= 0
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
