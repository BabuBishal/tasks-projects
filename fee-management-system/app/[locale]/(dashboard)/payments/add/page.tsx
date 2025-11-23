"use client";
import { useState, useEffect } from "react";
import PaymentForm from "../../../../../components/forms/PaymentForm";
import { StudentWithComputedTotals, PaymentFormInputs } from "@/lib/@types";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const { notify } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<PaymentFormInputs>({
    id: "",
    amount: 0,
    method: "cash",
    selectedFeeIds: "", // Add this to track selected fee IDs
  });

  const [formErrors, setFormErrors] = useState({
    id: "",
    amount: "",
    method: "",
  });

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();

      // Map API student shape to UI Student type with aggregated fee summary
      const mapped = (data || []).map((s: any) => {
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

      setStudents(mapped);
    } catch (err) {
      setError("Failed to load students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      // setSuccessMessage("");

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

      // console.log("Sending payment data:", paymentData);

      // Call the API directly
      const res = await fetch("/api/payment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Payment failed");
      }

      await res.json();

      // Show success message
      // setSuccessMessage(
      //   `Payment of Rs. ${formData.amount.toLocaleString()} processed successfully!`
      // );

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
      // Refresh student data to show updated balances
      await fetchStudents();

      // Clear success message after 5 seconds
      // setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to process payment");
      notify({
        title: "Payment Successful",
        description: err.message || "Added new payment successfully.",
        type: "error",
      });
    }
  };

  // if (loading) {
  //   return (
  //     <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading students...</p>
  //       </div>
  //     </div>
  //   );
  // }

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
        loading={loading}
      />
    </div>
  );
}
