// app/api/payment/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateFeeStatus } from "@/lib/utils/status-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, amount, method, selectedFeeIds } = body;

    // Validation
    if (!studentId || !amount || !method) {
      return NextResponse.json(
        { error: "Missing required fields: studentId, amount, method" },
        { status: 400 }
      );
    }

    if (!selectedFeeIds || selectedFeeIds.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one semester to pay" },
        { status: 400 }
      );
    }

    // Verify student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        fees: {
          where: {
            id: { in: selectedFeeIds },
          },
          orderBy: [{ academicYear: "asc" }, { createdAt: "asc" }],
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (student.fees.length === 0) {
      return NextResponse.json(
        { error: "No valid fees found for the selected semesters" },
        { status: 404 }
      );
    }

    // Calculate total balance from selected fees
    const totalBalance = student.fees.reduce(
      (sum, fee) => sum + fee.balance,
      0
    );
    console.log("student", student);

    console.log("totalBalance", totalBalance);
    console.log("amount", amount);

    if (amount > totalBalance) {
      return NextResponse.json(
        {
          error: `Payment amount (Rs. ${amount}) exceeds total balance (Rs. ${totalBalance})`,
        },
        { status: 400 }
      );
    }

    // Generate unique receipt number
    const receiptNo = `RCP-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Distribute payment across selected fees
    let remainingAmount = amount;
    const updatedFees = [];
    const paymentRecords = [];

    for (const fee of student.fees) {
      if (remainingAmount <= 0) break;

      // Calculate how much to pay for this fee
      const paymentForThisFee = Math.min(remainingAmount, fee.balance);
      const newPaid = fee.paid + paymentForThisFee;
      const newBalance = fee.balance - paymentForThisFee;
      console.log("newBalance", newBalance);

      // Use centralized status calculation
      const newStatus = calculateFeeStatus({
        balance: newBalance,
        paid: newPaid,
        payableFee: fee.payableFee,
        dueDate: fee.dueDate,
      });
      console.log("status", newStatus);

      // Update the fee record
      const updatedFee = await prisma.studentFee.update({
        where: { id: fee.id },
        data: {
          paid: newPaid,
          balance: newBalance,
          status: newStatus,
        },
        include: {
          feeStructure: {
            include: {
              programSemester: true,
            },
          },
        },
      });

      updatedFees.push(updatedFee);

      // Create payment record for this fee
      const payment = await prisma.payment.create({
        data: {
          studentFeeId: fee.id,
          method: method,
          amount: paymentForThisFee,
          receiptNo: `${receiptNo}-${updatedFees.length}`, // Unique receipt per fee
          date: new Date(),
        },
      });

      paymentRecords.push(payment);

      // Reduce remaining amount
      remainingAmount -= paymentForThisFee;
    }

    // Return success response with details
    return NextResponse.json(
      {
        message: "Payment processed successfully",
        receiptNo: receiptNo,
        totalPaid: amount,
        feesUpdated: updatedFees.length,
        payments: paymentRecords,
        updatedFees: updatedFees.map((fee) => ({
          id: fee.id,
          academicYear: fee.academicYear,
          semesterNo: fee.feeStructure.programSemester.semesterNo,
          paid: fee.paid,
          balance: fee.balance,
          status: fee.status,
        })),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to process payment", details: errorMessage },
      { status: 500 }
    );
  }
}
