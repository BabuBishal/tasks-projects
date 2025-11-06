import { NextResponse } from "next/server";

export async function GET() {
  // Fetch both datasets
  const [studentsRes, paymentsRes] = await Promise.all([
    fetch("http://localhost:4000/students"),
    fetch("http://localhost:4000/payments"),
  ]);

  if (!studentsRes.ok || !paymentsRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const students = await studentsRes.json();
  const payments = await paymentsRes.json();

  // Merge payments with corresponding student info
  const paymentHistory = payments.map((payment: any) => {
    let paymentStatus;
    const student = students.find((s: any) => s.id == payment.studentId);
    if (payment.amount === student.fees.total) {
      paymentStatus = "Full";
    } else if (payment.amount < student.fees.total) {
      paymentStatus = "Partial";
    }

    return {
      id: payment.id,
      studentId: payment.studentId,
      studentName: student?.name ?? "Unknown",
      rollNo: student?.rollNo ?? "N/A",
      program: student?.program ?? "N/A",
      amount: payment.amount,
      date: payment.date,
      method: payment.method,
      status: paymentStatus,
    };
  });

  return NextResponse.json(paymentHistory);
}
