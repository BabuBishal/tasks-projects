// app/api/students/bulk-delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentIds } = body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        { error: "Student IDs array is required" },
        { status: 400 }
      );
    }

    // Verify all students exist
    const students = await prisma.student.findMany({
      where: {
        id: { in: studentIds },
      },
      select: {
        id: true,
        name: true,
        rollNo: true,
      },
    });

    if (students.length !== studentIds.length) {
      return NextResponse.json(
        { error: "Some student IDs are invalid" },
        { status: 400 }
      );
    }

    // Delete students (cascade will handle fees, payments, scholarships)
    const deleteResult = await prisma.student.deleteMany({
      where: {
        id: { in: studentIds },
      },
    });

    return NextResponse.json({
      message: "Students deleted successfully",
      deleted: deleteResult.count,
      students: students,
    });
  } catch (error: unknown) {
    console.error("Bulk delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete students" },
      { status: 500 }
    );
  }
}
