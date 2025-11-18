import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(scholarships);
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    return NextResponse.json(
      { error: "Failed to fetch scholarships" },
      { status: 500 }
    );
  }
}
