import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feeStructures = await prisma.feeStructure.findMany({
      include: {
        programSemester: {
          include: {
            program: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feeStructures);
  } catch (error) {
    console.error("Error fetching fee structures:", error);
    return NextResponse.json(
      { error: "Failed to fetch fee structures" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      programId,
      semesterNo,
      academicYear,
      tuitionFee,
      labFee,
      libraryFee,
      sportsFee,
      miscFee,
    } = body;

    // Calculate total fee
    const totalFee =
      (tuitionFee || 0) +
      (labFee || 0) +
      (libraryFee || 0) +
      (sportsFee || 0) +
      (miscFee || 0);

    // 1. Find or create ProgramSemester
    let programSemester = await prisma.programSemester.findFirst({
      where: {
        programId,
        semesterNo: Number(semesterNo),
      },
    });

    if (!programSemester) {
      programSemester = await prisma.programSemester.create({
        data: {
          programId,
          semesterNo: Number(semesterNo),
        },
      });
    }

    // 2. Create FeeStructure
    const feeStructure = await prisma.feeStructure.create({
      data: {
        programSemesterId: programSemester.id,
        academicYear,
        tuitionFee: Number(tuitionFee),
        labFee: Number(labFee),
        libraryFee: Number(libraryFee),
        sportsFee: Number(sportsFee),
        miscFee: Number(miscFee),
        totalFee,
      },
    });

    return NextResponse.json(feeStructure, { status: 201 });
  } catch (error) {
    console.error("Error creating fee structure:", error);
    return NextResponse.json(
      { error: "Failed to create fee structure" },
      { status: 500 }
    );
  }
}
