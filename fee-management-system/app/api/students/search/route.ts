import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { StudentWithFees } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const programId = searchParams.get("programId");
    const semester = searchParams.get("semester");
    const status = searchParams.get("status");

    const where: Prisma.StudentWhereInput = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { rollNo: { contains: query, mode: "insensitive" } },
      ];
    }

    if (programId && programId !== "all") {
      where.programId = programId;
    }

    if (semester && semester !== "all") {
      where.semester = parseInt(semester);
    }

    if (status && status !== "all") {
      where.status = status;
    }

    const students = (await prisma.student.findMany({
      where,
      include: {
        program: true,
        fees: {
          include: {
            payments: true,
            feeStructure: {
              include: {
                programSemester: true,
              },
            },
          },
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as unknown as StudentWithFees[];

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch students from database",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
