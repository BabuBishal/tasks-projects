import { Payment, Student } from "@/lib/@types/types";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    studentId: string;
  };
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params);

  const finalParams =
    typeof resolvedParams === "string"
      ? JSON.parse(resolvedParams)
      : resolvedParams;

  const { studentId } = finalParams;

  try {
    // const res = await fetch(`http://localhost:4000/students/${studentId}`);

    const [studentsRes, paymentsRes] = await Promise.all([
      fetch(`http://localhost:4000/students/${studentId}`),
      fetch("http://localhost:4000/payments"),
    ]);
    if (!studentsRes.ok || !paymentsRes.ok) {
      return NextResponse.json(
        { error: studentsRes.statusText || paymentsRes.statusText },
        { status: studentsRes.status || paymentsRes.status }
      );
    }
    const student = await studentsRes.json();
    const payments = await paymentsRes.json();
    // console.log("student", student);
    const paymentHistory = payments.filter(
      (payment: Payment) => payment.studentId === student.id
    );
    // console.log("pay-history", paymentHistory);
    const studentDetails = {
      ...student,
      paymentHistory: paymentHistory,
    };
    // console.log("student", studentDetails);

    return NextResponse.json(studentDetails);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
