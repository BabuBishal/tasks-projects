// lib/fee-assignment.ts
import { prisma } from "../prisma";
import {
  getAcademicYearForSemester,
  getSemesterStartDate,
  getDueDate,
} from "./utils";

export interface FeeAssignmentResult {
  success: boolean;
  feeId?: string;
  error?: string;
  message?: string;
  isGraduated?: boolean;
}

/**
 * Assign fee for a specific semester to a student
 * This is used during semester promotion or manual fee assignment
 */
export async function assignFeeForSemester(
  studentId: string,
  semester: number,
  scholarshipId?: string
): Promise<FeeAssignmentResult> {
  try {
    // Get student details
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        program: true,
        scholarships: {
          include: {
            scholarship: true,
          },
        },
      },
    });

    if (!student) {
      return { success: false, error: "Student not found" };
    }

    // Check if fee already exists for this semester
    const existingFee = await prisma.studentFee.findFirst({
      where: {
        studentId: studentId,
        feeStructure: {
          programSemester: {
            programId: student.programId,
            semesterNo: semester,
          },
        },
      },
    });

    if (existingFee) {
      return {
        success: false,
        error: `Fee already exists for semester ${semester}`,
      };
    }

    // Find fee structure
    const feeStructure = await prisma.feeStructure.findFirst({
      where: {
        programSemester: {
          programId: student.programId,
          semesterNo: semester,
        },
      },
    });

    if (!feeStructure) {
      return {
        success: false,
        error: `No fee structure found for ${student.program.name} Semester ${semester}`,
      };
    }

    // Get scholarship (from parameter or student's existing scholarship)
    let scholarship = null;
    if (scholarshipId) {
      scholarship = await prisma.scholarship.findUnique({
        where: { id: scholarshipId },
      });
    } else if (student.scholarships.length > 0) {
      scholarship = student.scholarships[0].scholarship;
    }

    // Calculate discount
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

    // Calculate dates
    const academicYear = getAcademicYearForSemester(
      student.joinedYear,
      semester
    );
    const startDate = getSemesterStartDate(student.joinedYear, semester);
    const dueDate = getDueDate(startDate);

    // Determine status
    const now = new Date();
    const initialStatus = dueDate < now ? "Overdue" : "Pending";

    // Create fee record
    const studentFee = await prisma.studentFee.create({
      data: {
        studentId: studentId,
        feeStructureId: feeStructure.id,
        academicYear: academicYear,
        originalFee: feeStructure.totalFee,
        discount: discount,
        payableFee: payableFee,
        balance: payableFee,
        status: initialStatus,
        dueDate: dueDate,
      },
    });

    return { success: true, feeId: studentFee.id };
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Promote student to next semester and assign fee
 */
export async function promoteSemester(
  studentId: string
): Promise<FeeAssignmentResult> {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        program: true,
        fees: true, // Include fees to check balance
      },
    });

    if (!student) {
      return { success: false, error: "Student not found" };
    }

    const nextSemester = student.semester + 1;

    // Check if student has completed the program (Graduation Check)
    if (nextSemester > student.program.duration) {
      // Calculate total outstanding balance
      const totalOutstanding = student.fees.reduce(
        (sum, fee) => sum + fee.balance,
        0
      );

      if (totalOutstanding > 0) {
        return {
          success: false,
          error: `Cannot graduate student. Outstanding fees: Rs. ${totalOutstanding.toLocaleString()}`,
        };
      }

      // Graduate the student
      await prisma.student.update({
        where: { id: studentId },
        data: { status: "Graduated" },
      });

      return {
        success: true,
        isGraduated: true,
        message: "Student has graduated successfully!",
      };
    }

    // Update student semester
    await prisma.student.update({
      where: { id: studentId },
      data: { semester: nextSemester },
    });

    // Assign fee for next semester
    return await assignFeeForSemester(studentId, nextSemester);
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Update fee status (e.g., Pending -> Overdue)
 */
export async function updateFeeStatus(
  feeId: string,
  status: string
): Promise<boolean> {
  try {
    await prisma.studentFee.update({
      where: { id: feeId },
      data: { status },
    });
    return true;
  } catch (error: unknown) {
    return false;
  }
}

/**
 * Calculate and return all overdue fees
 * This can be run as a cron job to update statuses
 */
export async function calculateOverdueFees(): Promise<string[]> {
  try {
    const now = new Date();

    // Find all fees that are past due date but not fully paid
    const overdueFees = await prisma.studentFee.findMany({
      where: {
        dueDate: { lt: now },
        balance: { gt: 0 },
        status: { in: ["Pending", "Partial"] },
      },
    });

    // Update their status to Overdue
    const updatedIds: string[] = [];
    for (const fee of overdueFees) {
      await prisma.studentFee.update({
        where: { id: fee.id },
        data: { status: "Overdue" },
      });
      updatedIds.push(fee.id);
    }

    return updatedIds;
  } catch (error) {
    console.error("Error calculating overdue fees:", error);
    return [];
  }
}
