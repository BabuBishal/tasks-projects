import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { StudentFull } from "@/lib/@types/prisma";

// GET single student by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // console.log("Attempting to fetch student with ID:", id);

  console.log("🔍 API ROUTE - Received ID:", id);
  console.log("🔍 API ROUTE - Full params:", params);
  console.log("🔍 API ROUTE - Request URL:", req.url);

  // CRITICAL CHECK: Ensure the ID is present from the URL (e.g., /api/students/123)
  if (!id) {
    return NextResponse.json(
      { error: "Missing student ID in request URL" },
      { status: 400 }
    );
  }

  try {
    const student = (await prisma.student.findUnique({
      where: { id },
      include: {
        program: true,
        fees: {
          include: {
            payments: true,
            feeStructure: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
    })) as unknown as StudentFull | null;

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// UPDATE student
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // CRITICAL CHECK: Ensure the ID is present
  if (!id) {
    return NextResponse.json(
      { error: "Missing student ID in request URL" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check for duplicate email (if changing)
    if (body.email && body.email !== existingStudent.email) {
      const emailExists = await prisma.student.findUnique({
        where: { email: body.email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Check for duplicate roll number (if changing)
    if (body.rollNo && body.rollNo !== existingStudent.rollNo) {
      const rollNoExists = await prisma.student.findUnique({
        where: { rollNo: body.rollNo },
      });

      if (rollNoExists) {
        return NextResponse.json(
          { error: "Roll number already exists" },
          { status: 400 }
        );
      }
    }

    // Verify program exists (if changing)
    if (body.programId) {
      const program = await prisma.program.findUnique({
        where: { id: body.programId },
      });

      if (!program) {
        return NextResponse.json(
          { error: "Invalid program ID" },
          { status: 400 }
        );
      }
    }

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.rollNo && { rollNo: body.rollNo }),
        ...(body.programId && { programId: body.programId }),
        ...(body.semester !== undefined && { semester: body.semester }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.year !== undefined && { year: body.year }),
      },
      include: {
        program: true,
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE student
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // CRITICAL CHECK: Ensure the ID is present
  if (!id) {
    return NextResponse.json(
      { error: "Missing student ID in request URL" },
      { status: 400 }
    );
  }

  try {
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        fees: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Check if student has any fees/payments
    if (student.fees.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete student with existing fees. Please clear all fees first.",
        },
        { status: 400 }
      );
    }

    // Delete student (scholarships will be cascade deleted)
    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
