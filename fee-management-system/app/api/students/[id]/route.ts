import { Student } from "@/lib/@types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  try {
    const res = await fetch(`http://localhost:4000/students/${id}`);
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
