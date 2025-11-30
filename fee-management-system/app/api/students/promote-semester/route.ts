import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promoteSemester } from "@/lib/utils/fee-assignment";
interface Success {
  studentId: string;
  name?: string;
  rollNo?: string;
  oldSemester?: number;
  newSemester?: number | null;
  isGraduated?: boolean;
  feeId?: string;
  message?: string;
}

interface Failed {
  studentId: string;
  name?: string;
  rollNo?: string;
  error?: string;
}

interface Results {
  success: Success[];
  failed: Failed[];
  total: number;
}

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

    const results: Results = {
      success: [] as Success[],
      failed: [] as Failed[],
      total: studentIds.length,
    };

    // Process each student
    for (const studentId of studentIds) {
      try {
        const student = await prisma.student.findUnique({
          where: { id: studentId },
          include: { program: true },
        });

        if (!student) {
          results.failed.push({
            studentId,
            error: "Student not found",
          });
          continue;
        }

        const result = await promoteSemester(studentId);

        if (result.success) {
          if (result.isGraduated) {
            results.success.push({
              studentId,
              name: student.name,
              rollNo: student.rollNo,
              oldSemester: student.semester,
              newSemester: null, // Graduated
              isGraduated: true,
              message: "Student has graduated successfully!",
            });
          } else {
            results.success.push({
              studentId,
              name: student.name,
              rollNo: student.rollNo,
              oldSemester: student.semester,
              newSemester: student.semester + 1,
              isGraduated: false,
              feeId: result.feeId,
            });
          }
        } else {
          results.failed.push({
            studentId,
            name: student.name,
            rollNo: student.rollNo,
            error: result.error,
          });
        }
      } catch (error: unknown) {
        results.failed.push({
          studentId,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      message: "Semester promotion completed",
      results,
    });
  } catch (error: unknown) {
    console.error("Promote semester error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to promote students",
      },
      { status: 500 }
    );
  }
}
