import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ScholarshipsListResponse } from "@/lib/types/api";

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json<ScholarshipsListResponse>(
      scholarships as unknown as ScholarshipsListResponse
    );
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch scholarships from database",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
