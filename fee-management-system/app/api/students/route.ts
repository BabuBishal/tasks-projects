// app/api/students/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { StudentWithFees } from "@/lib/@types/prisma";
import {
  getAcademicYearForSemester,
  getSemesterStartDate,
  getDueDate,
  calculateJoinedYear,
  generateProgramPrefix,
} from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const students = (await prisma.student.findMany({
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
    return NextResponse.json(
      { error: "Something went wrong while fetching students" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, programId, semester, phone, address, scholarshipId } =
      body;

    // Required field check
    if (!name || !email || !programId) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, programId" },
        { status: 400 }
      );
    }

    // Check email uniqueness
    const existingEmail = await prisma.student.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Verify program exists
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      return NextResponse.json(
        { error: "Invalid program ID" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 1️⃣ Auto-generate roll number using program prefix
    // ---------------------------------------------------------

    const prefix = generateProgramPrefix(program.name);
    const joinedYear = calculateJoinedYear(semester);
    const studentSemester = Number(semester) || 1;

    // Count existing students in same program + year
    const studentCount = await prisma.student.count({
      where: { programId: programId, year: joinedYear },
    });

    const rollNo = `${prefix}-${joinedYear}-${String(studentCount + 1).padStart(
      4,
      "0"
    )}`;

    // ---------------------------------------------------------
    // 2️⃣ Fetch scholarship once (if provided)
    // ---------------------------------------------------------
    let scholarship = null;
    if (scholarshipId) {
      scholarship = await prisma.scholarship.findUnique({
        where: { id: scholarshipId },
      });
    }

    // ---------------------------------------------------------
    // 3️⃣ Create StudentFee record ONLY for current semester
    // IMPROVED: No retroactive fees for past semesters
    // ---------------------------------------------------------
    const studentFeesToCreate = [];

    // Only create fee for the current semester
    const sem = studentSemester;

    // Calculate academic year for this semester
    const academicYear = getAcademicYearForSemester(joinedYear, sem);
    const startDate = getSemesterStartDate(joinedYear, sem);
    const dueDate = getDueDate(startDate);

    // Find the fee structure for this program and semester
    const feeStructure = await prisma.feeStructure.findFirst({
      where: {
        programSemester: {
          programId: programId,
          semesterNo: sem,
        },
      },
    });

    if (!feeStructure) {
      return NextResponse.json(
        {
          error: `No fee structure found for ${program.name} Semester ${sem}. Please configure fee structure first.`,
        },
        { status: 400 }
      );
    }

    // Calculate discount for this semester
    let discount = 0;
    if (scholarship) {
      if (scholarship.type === "percentage") {
        discount = Math.floor(
          (feeStructure.totalFee * scholarship.value) / 100
        );
      } else if (scholarship.type === "fixed") {
        discount = scholarship.value;
      }
    }

    const payableFee = Math.max(0, feeStructure.totalFee - discount);

    // Determine initial status based on due date
    const now = new Date();
    const initialStatus = dueDate < now ? "Overdue" : "Pending";

    studentFeesToCreate.push({
      feeStructureId: feeStructure.id,
      academicYear: academicYear,
      originalFee: feeStructure.totalFee,
      discount: discount,
      payableFee: payableFee,
      balance: payableFee,
      status: initialStatus,
      dueDate: dueDate,
    });

    console.log(
      `Creating student in Semester ${studentSemester} with ${studentFeesToCreate.length} fee records`
    );

    // Validation: Ensure at least one fee was created
    if (studentFeesToCreate.length === 0) {
      return NextResponse.json(
        {
          error: `No fee structures found for ${program.name}. Please configure fee structures first.`,
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 4️⃣ Create student with all fee records and scholarships
    // ---------------------------------------------------------
    const studentData: any = {
      name,
      email,
      rollNo,
      programId,
      semester: studentSemester,
      phone: phone || "",
      address: address || "",
      year: joinedYear,
      joinedYear: joinedYear,
      fees: {
        create: studentFeesToCreate,
      },
    };

    // Add scholarship if provided
    if (scholarshipId && scholarshipId.trim() !== "") {
      studentData.scholarships = {
        create: {
          scholarshipId: scholarshipId,
        },
      };
    }

    const newStudent = await prisma.student.create({
      data: studentData,
      include: {
        program: true,
        fees: {
          include: {
            feeStructure: {
              include: {
                programSemester: true,
              },
            },
            payments: true,
          },
          orderBy: [{ academicYear: "asc" }, { createdAt: "asc" }],
        },
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create student", details: errorMessage },
      { status: 500 }
    );
  }
}
