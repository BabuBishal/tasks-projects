import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://localhost:4000/payments");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Payments" },
        { status: res.status }
      );
    }

    const payments = await res.json();
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching Payments:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching payments" },
      { status: 500 }
    );
  }
}
