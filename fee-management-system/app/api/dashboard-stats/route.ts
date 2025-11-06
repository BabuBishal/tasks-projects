import { Student } from "@/lib/@types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch("http://localhost:4000/students");
  const students = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }

  // For Dashboard Stats
  const totalStudents = students.length;

  const totalFee = students.reduce(
    (sum: number, student: Student) => sum + student.fees.total,
    0
  );

  const totalRevenue = students.reduce(
    (sum: number, student: Student) => sum + student.fees.paid,
    0
  );

  const pendingPayment = students.reduce(
    (sum: number, student: Student) => sum + student.fees.balance,
    0
  );

  const paymentStatusPercentage = Math.floor((totalRevenue / totalFee) * 100);

  // For payment stats

  const pendingStudents = students.filter(
    (student: Student) =>
      student.fees.balance > 0 && student.fees.balance !== student.fees.total
  ).length;

  const paidStudents = students.filter(
    (student: Student) => student.fees.balance == 0
  ).length;

  const overdueStudents = students.filter(
    (student: Student) => student.fees.balance === student.fees.total
  ).length;

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `$ ${totalRevenue}`,
      desc: "Total fees collected",
    },
    {
      title: "Total Students",
      value: totalStudents,
      desc: "Total students enrolled",
    },
    {
      title: "Pending Payments",
      value: `$ ${pendingPayment}`,
      desc: "Awaiting Payments",
    },
    {
      title: "Collection Status",
      value: `${paymentStatusPercentage} %`,
      desc: "Total Payment Success",
    },
  ];

  const paymentStats = {
    paid: paidStudents,
    overdue: overdueStudents,
    pending: pendingStudents,
    total: totalStudents,
  };

  return NextResponse.json({
    dashboardStats: dashboardStats,
    paymentStats: paymentStats,
  });
}
