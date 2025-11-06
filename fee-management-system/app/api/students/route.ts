import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:4000/students");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch students" },
        { status: res.status }
      );
    }

    const students = await res.json();
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching students" },
      { status: 500 }
    );
  }
}
