"use client";

import { useState } from "react";
import { Button } from "../ui/button/Button";

interface Program {
  id: string;
  name: string;
  duration: number;
  semesters: { semesterNo: number }[];
}

interface FeeStructureFormProps {
  initialData?: {
    programSemester?: {
      programId: string;
      semesterNo: number;
      program?: {
        name: string;
      };
    };

    tuitionFee?: number;
    labFee?: number;
    libraryFee?: number;
    sportsFee?: number;
    miscFee?: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
  programs: Program[];
  loading?: boolean;
}

export default function FeeStructureForm({
  initialData,
  onSubmit,
  onCancel,
  programs,
  loading = false,
}: FeeStructureFormProps) {
  const [formData, setFormData] = useState({
    programId: initialData?.programSemester?.programId || "",
    semesterNo: initialData?.programSemester?.semesterNo?.toString() || "",

    tuitionFee: initialData?.tuitionFee || 0,
    labFee: initialData?.labFee || 0,
    libraryFee: initialData?.libraryFee || 0,
    sportsFee: initialData?.sportsFee || 0,
    miscFee: initialData?.miscFee || 0,
  });

  const selectedProgram = programs.find((p) => p.id === formData.programId);
  const availableSemesters = selectedProgram
    ? Array.from({ length: selectedProgram.duration }, (_, i) => i + 1)
    : [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("Fee") || name === "semesterNo"
          ? Number(value) || value 
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalFee =
    Number(formData.tuitionFee || 0) +
    Number(formData.labFee || 0) +
    Number(formData.libraryFee || 0) +
    Number(formData.sportsFee || 0) +
    Number(formData.miscFee || 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Program</label>
          <select
            name="programId"
            value={formData.programId}
            onChange={handleChange}
            disabled={!!initialData} 
            className="w-full p-2 border rounded-md bg-background"
            required
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <select
            name="semesterNo"
            value={formData.semesterNo}
            onChange={handleChange}
            disabled={!formData.programId}
            className="w-full p-2 border rounded-md bg-background"
            required
          >
            <option value="">Select Semester</option>
            {availableSemesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tuition Fee</label>
          <input
            type="number"
            name="tuitionFee"
            value={formData.tuitionFee}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lab Fee</label>
          <input
            type="number"
            name="labFee"
            value={formData.labFee}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Library Fee</label>
          <input
            type="number"
            name="libraryFee"
            value={formData.libraryFee}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sports Fee</label>
          <input
            type="number"
            name="sportsFee"
            value={formData.sportsFee}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Misc Fee</label>
          <input
            type="number"
            name="miscFee"
            value={formData.miscFee}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-background"
            min="0"
          />
        </div>
      </div>

      <div className="p-4 bg-accent rounded-md flex justify-between items-center">
        <span className="font-semibold">Total Fee:</span>
        <span className="text-xl font-bold text-primary">
          Rs. {totalFee.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
