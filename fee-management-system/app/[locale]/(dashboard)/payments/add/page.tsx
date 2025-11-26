"use client";
import { useState, useEffect, useMemo } from "react";
import PaymentForm from "../../../../../components/forms/PaymentForm";
import { PaymentFormInputs } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetStudentsQuery } from "@/hooks/query-hooks/students/query";
import { useAddPayment } from "@/hooks/query-hooks/payments/mutation";

export default function PaymentPage() {
  const { notify } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use React Query hooks
  const { data: studentsData, isLoading: loadingStudents } =
    useGetStudentsQuery();
  const addPaymentMutation = useAddPayment();

  const [error, setError] = useState("");

  // Transform students data using useMemo to avoid re-computation
  const students = useMemo(() => {
    return (studentsData || []).map((s: any) => {
      const programName = s.program?.name ?? s.program ?? "";

      // Build a detailed feesList from the API fees
      const feesList = (s.fees || []).map((f: any) => ({
        id: f.id,
        academicYear: f.academicYear,
        semesterNo:
          f.feeStructure?.programSemester?.semesterNo ??
          f.feeStructure?.programSemester ??
          0,
        originalFee: f.originalFee ?? f.feeStructure?.totalFee ?? 0,
        discount: f.discount ?? 0,
        payableFee: f.payableFee ?? f.originalFee ?? 0,
        paid: f.paid ?? 0,
        balance: f.balance ?? (f.payableFee ?? 0) - (f.paid ?? 0),
        status: f.status ?? "N/A",
        dueDate: f.dueDate ?? null,
      }));

      // Choose a primary fee record for quick summary (prefer same semester/current year)
      const currentAcademicYear = `${s.year}/${String(s.year + 1).slice(-2)}`;
      let primary = feesList.find(
        (ff: any) =>
          ff.semesterNo === s.semester &&
          ff.academicYear === currentAcademicYear
      );
      if (!primary)
        primary =
          feesList.find((ff: any) => ff.semesterNo === s.semester) ||
          feesList[0] ||
          null;

      const total = primary?.payableFee ?? 0;
      const paid = primary?.paid ?? 0;
      const balance = primary?.balance ?? total - paid;
      const dueDate = primary?.dueDate ?? null;
      const status = primary?.status ?? "N/A";

      const totalOutstandingAll = feesList.reduce(
        (acc: number, f: any) => acc + (f.balance ?? 0),
        0
      );

      return {
        id: s.id,
        name: s.name,
        rollNo: s.rollNo,
        program: programName,
        year: s.year,
        semester: s.semester,
        email: s.email,
        phone: s.phone,
        address: s.address,
        fees: {
          total,
          paid,
          balance,
          dueDate,
          status,
          totalOutstandingAll,
        },
        feesList,
      };
    });
  }, [studentsData]);

  const [formData, setFormData] = useState<PaymentFormInputs>({
    id: "",
    amount: 0,
    method: "cash",
    selectedFeeIds: "",
  });

  const [formErrors, setFormErrors] = useState({
    id: "",
    amount: "",
    method: "",
  });

  // Pre-select student from URL parameter - use initializer to avoid cascading renders
  useEffect(() => {
    const studentId = searchParams.get("studentId");
    if (studentId && students.length > 0) {
      const studentExists = students.find((s: any) => s.id === studentId);
      if (studentExists) {
        setFormData((prev) => {
          // Only update if not already set to avoid infinite loop
          if (prev.id !== studentId) {
            return { ...prev, id: studentId };
          }
          return prev;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students.length, searchParams]);

  // Helper to set amount from child component
  const setFormAmount = (value: number) =>
    setFormData((prev) => ({ ...prev, amount: Number(value || 0) }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors = {
      id: "",
      amount: "",
      method: "",
    };

    if (!formData.id) errors.id = "Student is required";
    if (!formData.amount || formData.amount <= 0)
      errors.amount = "Valid amount is required";
    if (!formData.method) errors.method = "Payment method is required";

    setFormErrors(errors);

    // Also check if any semesters are selected
    if (!formData.selectedFeeIds || formData.selectedFeeIds.trim() === "") {
      setError("Please select at least one semester to pay");
      return false;
    }

    return !errors.id && !errors.amount && !errors.method;
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setError("");

      // Validate that we have selected fees
      if (!formData.selectedFeeIds || formData.selectedFeeIds.trim() === "") {
        setError("Please select at least one semester to pay");
        return;
      }

      const paymentData = {
        studentId: formData.id,
        amount: formData.amount,
        method: formData.method,
        selectedFeeIds: formData.selectedFeeIds
          .split(",")
          .filter((id) => id.trim() !== ""),
      };

      await addPaymentMutation.mutateAsync(paymentData);

      // Reset form ONLY after successful submission
      setFormData({
        id: "",
        amount: 0,
        method: "cash",
        selectedFeeIds: "",
      });
      notify({
        title: "Payment Successful",
        description: "Added new payment successfully.",
        type: "success",
      });
      router.push("/payments");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to process payment"
      );
      notify({
        title: "Payment Failed",
        description:
          err instanceof Error ? err.message : "Failed to process payment.",
        type: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <PaymentForm
        formData={formData}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        error={error}
        students={students}
        setAmount={setFormAmount}
        loading={loadingStudents}
      />
    </div>
  );
}
