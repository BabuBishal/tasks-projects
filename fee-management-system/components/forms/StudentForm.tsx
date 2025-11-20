"use client";

import { AddStudentFormProps } from "@/lib/@types/types";
import { Program } from "@/lib/@types/prisma";

interface Props extends AddStudentFormProps {
  error?: string;
  programs: Program[];
  scholarships: { id: string; name: string }[];
  loading: boolean;
}

export default function StudentForm({
  onSubmit,
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
  programs,
  scholarships,
  loading,
}: Props) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="bg-background border border-border p-8 rounded-lg shadow max-w-2xl w-full mx-auto shadow-muted"
    >
      {/* <h2 className="text-secondary text-xl font-semibold mb-6 text-center">
        Add Student
      </h2> */}

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent focus:outline-none focus:ring"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm">{formErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Email *</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>

      {/* Roll No */}
      {/* <div className="mb-4">
        <label className="block text-sm mb-1">Roll No *</label>
        <input
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        />
        {formErrors.rollNo && <p className="text-red-500 text-sm">{formErrors.rollNo}</p>}
      </div> */}

      {/* Program */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Program *</label>
        <select
          name="programId"
          value={formData.programId}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        >
          <option value="">Select program</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {formErrors.programId && (
          <p className="text-red-500 text-sm">{formErrors.programId}</p>
        )}
      </div>

      {/* Semester */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Semester</label>
        <input
          type="number"
          name="semester"
          min={1}
          value={formData.semester}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        />
        {formErrors.semester && (
          <p className="text-red-500 text-sm">{formErrors.semester}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-sm">{formErrors.phone}</p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        />
        {formErrors.address && (
          <p className="text-red-500 text-sm">{formErrors.address}</p>
        )}
      </div>

      {/* Scholarships */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Scholarship (optional)</label>
        <select
          name="scholarshipId"
          value={formData.scholarshipId}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-accent"
        >
          <option value="">Select Scholarship</option>
          {scholarships.map((scholarship) => (
            <option key={scholarship.id} value={scholarship.id}>
              {scholarship.name}
            </option>
          ))}
        </select>
        {formErrors.scholarshipId && (
          <p className="text-red-500 text-sm">{formErrors.scholarshipId}</p>
        )}
      </div>

      {/* Fee Preview */}
      {/* {feeStructure && (
        <div className="mb-6 p-4 bg-accent rounded border">
          <p className="text-sm flex justify-between">
            <span>Total Fee:</span>
            <strong>Rs {feePreview.originalFee}</strong>
          </p>
          {feePreview.discount > 0 && (
            <p className="text-sm flex justify-between text-green-600">
              <span>Discount:</span>
              <strong>- Rs {feePreview.discount}</strong>
            </p>
          )}
          <p className="text-sm flex justify-between mt-2 text-blue-600">
            <span>Payable Fee:</span>
            <strong>Rs {feePreview.payableFee}</strong>
          </p>
        </div>
      )} */}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-background py-2 rounded hover:bg-secondary transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
