import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type {
  ProgramsListResponse,
  CreateProgramResponse,
} from "@/lib/types/api";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        semesters: true,
        _count: {
          select: { students: true },
        },
      },
    });

    return NextResponse.json<ProgramsListResponse>(programs, { status: 200 });
  } catch (error) {
    console.error("Error fetching programs:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch programs from database",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, duration } = body;

    if (!name || !duration) {
      return NextResponse.json(
        { error: "Name and duration are required" },
        { status: 400 }
      );
    }

    // Create program and semesters in a transaction
    const program = await prisma.$transaction(async (tx) => {
      // 1. Create the program
      const newProgram = await tx.program.create({
        data: {
          name,
          duration: parseInt(duration),
        },
      });

      // 2. Create semesters
      const semestersData = Array.from(
        { length: parseInt(duration) },
        (_, i) => ({
          programId: newProgram.id,
          semesterNo: i + 1,
        })
      );

      await tx.programSemester.createMany({
        data: semestersData,
      });

      return newProgram;
    });

    return NextResponse.json<CreateProgramResponse>(program, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating program:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create program", details: errorMessage },
      { status: 500 }
    );
  }
}
