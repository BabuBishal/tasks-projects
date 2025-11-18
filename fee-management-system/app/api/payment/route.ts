import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        studentFee: {
          include: {
            student: true,
          },
        },
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching Payments:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching payments" },
      { status: 500 }
    );
  }
}
