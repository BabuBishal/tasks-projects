import { NextRequest, NextResponse } from "next/server";

type Program = "BBA" | "BBM" | "BIM" | "BSc CSIT";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { program, semester } = body;
    const id = `STU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let fee = 0;
    if (program === "BBA") fee = 75000;
    else if (program === "BBM") fee = 70000;
    else if (program === "BIM") fee = 65000;
    else if (program === "BSc CSIT") fee = 95000;

    let year = 1;
    if (semester <= 2) year = 1;
    else if (semester <= 4) year = 2;
    else if (semester <= 6) year = 3;
    else if (semester <= 8) year = 4;

    const newStudent = {
      ...body,
      id,
      year,
      fees: {
        total: fee,
        paid: 0,
        balance: fee,
        dueDate: "2026-12-30",
        status: "Overdue",
      },
    };
    const res = await fetch("http://localhost:4000/students/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to add student" },
        { status: res.status }
      );
    }

    const student = await res.json();
    return NextResponse.json(student);
  } catch (err) {
    console.error("Error adding student:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
