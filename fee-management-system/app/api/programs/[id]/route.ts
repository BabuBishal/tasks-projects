import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        semesters: true,
      },
    });

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { error: "Failed to fetch program" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, duration } = body;

    if (!name || !duration) {
      return NextResponse.json(
        { error: "Name and duration are required" },
        { status: 400 }
      );
    }

    const existingProgram = await prisma.program.findUnique({
      where: { id },
      include: { semesters: true },
    });

    if (!existingProgram) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const newDuration = parseInt(duration);
    const oldDuration = existingProgram.duration;

    // Update program details
    const updatedProgram = await prisma.$transaction(async (tx) => {
      const program = await tx.program.update({
        where: { id },
        data: {
          name,
          duration: newDuration,
        },
      });

      // Handle duration changes
      if (newDuration > oldDuration) {
        // Add new semesters
        const newSemesters = Array.from(
          { length: newDuration - oldDuration },
          (_, i) => ({
            programId: id,
            semesterNo: oldDuration + i + 1,
          })
        );
        await tx.programSemester.createMany({
          data: newSemesters,
        });
      } else if (newDuration < oldDuration) {
        // Remove extra semesters
        // WARNING: This might delete associated fee structures and student data if cascade is on
        await tx.programSemester.deleteMany({
          where: {
            programId: id,
            semesterNo: { gt: newDuration },
          },
        });
      }

      return program;
    });

    return NextResponse.json(updatedProgram, { status: 200 });
  } catch (error: any) {
    console.error("Error updating program:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Program with this name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update program" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.program.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Program deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    );
  }
}
