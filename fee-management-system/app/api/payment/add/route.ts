import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, amount, method } = body;

    const resStudent = await fetch(`http://localhost:4000/students/${id}`);
    if (!resStudent.ok) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    const student = await resStudent.json();

    const paid = student.fees.paid + Number(amount);
    const balance = student.fees.total - paid;
    const updatedFees = {
      total: student.fees.total,
      paid,
      balance,
      dueDate: student.fees.dueDate,
      status: balance === 0 ? "Paid" : balance > 0 ? "Partial" : "Overdue",
    };

    const paymentId = `P-${Math.floor(Math.random() * 1000)}`;
    const receiptId = `Txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newPayment = {
      id: paymentId,
      studentId: id,
      method,
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      reeiptNo: receiptId,
    };

    const res = await fetch("http://localhost:4000/payments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to add paymentx" },
        { status: res.status }
      );
    }

    await fetch(`http://localhost:4000/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fees: updatedFees }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error adding payment:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
