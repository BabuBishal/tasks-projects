import { Student } from "@/lib/@types/types";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: {
    studentId: string;
  };
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { params } = context;
  const { studentId } = params;
console.log("studentId", studentId);
  console.log("params", params);
  try {
    const res = await fetch(`http://localhost:4000/students/${studentId}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: res.statusText },
        { status: res.status }
      );
    }
    const student = await res.json();

    return NextResponse.json(student);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
