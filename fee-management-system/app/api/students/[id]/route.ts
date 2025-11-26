import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { StudentFull } from "@/lib/types/prisma";

// GET single student by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

    // Calculate total original fee first (needed for percentage scholarships)
    const totalOriginalFee = student.fees.reduce(
      (total, fee) => total + fee.originalFee,
      0
    );

    // Calculate total scholarship amount based on type
    const totalScholarshipAmount = student.scholarships.reduce((total, ss) => {
      const scholarship = ss.scholarship;

      if (scholarship.type === "fixed") {
        // Fixed amount (e.g., Sports Scholarship)
        return total + scholarship.value;
      } else if (scholarship.type === "percentage") {
        // Percentage-based (e.g., Merit 25%, Need-based 50%)
        // Calculate percentage of total original fee
        const scholarshipAmount = (totalOriginalFee * scholarship.value) / 100;
        return total + scholarshipAmount;
      }

      return total;
    }, 0);

    // Calculate total payable fee (sum of all fee payableFee)
    const totalPayableFee = student.fees.reduce(
      (total, fee) => total + fee.payableFee,
      0
    );

    // Calculate total paid (sum of all fee paid)
    const totalPaid = student.fees.reduce((total, fee) => total + fee.paid, 0);

    // Calculate total balance/remaining (sum of all fee balance)
    const totalBalance = student.fees.reduce(
      (total, fee) => total + fee.balance,
      0
    );

    // Calculate total discount applied
    const totalDiscount = student.fees.reduce(
      (total, fee) => total + fee.discount,
      0
    );

    // Calculate scholarships with actual amounts for display
    const scholarshipsWithAmounts = student.scholarships.map((ss) => {
      const scholarship = ss.scholarship;
      let actualAmount = 0;

      if (scholarship.type === "fixed") {
        actualAmount = scholarship.value;
      } else if (scholarship.type === "percentage") {
        actualAmount = (totalOriginalFee * scholarship.value) / 100;
      }

      return {
        ...ss,
        actualAmount, // Add calculated amount
      };
    });

    // Attach calculated totals to the student object
    const studentWithTotals = {
      ...student,
      scholarships: scholarshipsWithAmounts, // Replace with scholarships that have actualAmount
      totalScholarshipAmount,
      totalOriginalFee,
      totalPayableFee,
      totalPaid,
      totalBalance,
      totalDiscount,
    };

    return NextResponse.json(studentWithTotals);
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

    // Validate semester if provided
    if (body.semester !== undefined && body.semester !== null) {
      const semesterNum = Number(body.semester);
      if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 12) {
        return NextResponse.json(
          { error: "Semester must be a number between 1 and 12" },
          { status: 400 }
        );
      }
    }

    if (
      body.semester !== undefined &&
      body.semester !== existingStudent.semester
    ) {
      const feeCount = await prisma.studentFee.count({
        where: { studentId: id },
      });

      if (feeCount > 0) {
        return NextResponse.json(
          {
            error:
              "Cannot change semester because this student already has associated fees.",
          },
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
      { error: error || "Failed to update student" },
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

    console.log(" std", student);

    // Check if student has any fees/payments
    if (student.fees[0].balance > 0) {
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
