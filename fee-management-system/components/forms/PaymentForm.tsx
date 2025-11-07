"use client";
import { PaymentFormProps, Student } from "@/lib/@types/types";
import { paymentMethod } from "@/lib/constants";
import { useState } from "react";
import { Button } from "../ui/Button/Button";

export default function PaymentForm({
  onSubmit,
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
  students,
}: PaymentFormProps & { error: string; students: Student[] }) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const student = students.find((s) => String(s.id) === id) || null;
    setSelectedStudent(student);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="bg-background flex flex-col gap-2 justify-center border-border  p-8 rounded-lg shadow w-full max-w-sm mx-auto shadow-muted"
    >
      <h2 className="text-secondary text-xl font-semibold mb-6 text-center">
        Fee Payment
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Student Name</label>
        <select
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
          value={formData.id}
          name="id"
          onChange={(e) => {
            handleChange(e);
            handleStudentChange(e);
          }}
        >
          <option value="" disabled defaultValue={""}>
            Select student
          </option>
          {students?.map((option: Student) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {formErrors.id && (
          <p className="text-red-500 text-sm mt-1">{formErrors.id}</p>
        )}
      </div>
      {selectedStudent && (
        <div className="mb-4 border border-border rounded-md p-3 bg-accent/40 text-sm text-secondary">
          <p>
            <strong>Program:</strong> {selectedStudent.program}
          </p>
          <p>
            <strong>Semester:</strong> {selectedStudent.semester}
          </p>
          <p>
            <strong>Total Fee:</strong> Rs. {selectedStudent.fees?.total}
          </p>
          <p>
            <strong>Paid:</strong> Rs. {selectedStudent.fees?.paid}
          </p>
          <p>
            <strong>Balance:</strong> Rs. {selectedStudent.fees?.balance}
          </p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          max={selectedStudent?.fees?.balance}
          value={formData.amount}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.amount && (
          <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Method</label>
        <select
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
          value={formData.method}
          name="method"
          onChange={handleChange}
        >
          <option value="" disabled defaultValue={""}>
            Select payment method
          </option>
          {paymentMethod?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {formErrors.method && (
          <p className="text-red-500 text-sm mt-1">{formErrors.method}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <Button
        variant="primary"
        className="w-full self-center px-10 min-w-20"
        disabled={!selectedStudent || selectedStudent?.fees.balance === 0}
      >
        Pay
      </Button>
    </form>
  );
}
