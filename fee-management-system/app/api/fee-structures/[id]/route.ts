import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { academicYear, tuitionFee, labFee, libraryFee, sportsFee, miscFee } =
      body;

    // Calculate total fee
    const totalFee =
      (tuitionFee || 0) +
      (labFee || 0) +
      (libraryFee || 0) +
      (sportsFee || 0) +
      (miscFee || 0);

    const feeStructure = await prisma.feeStructure.update({
      where: { id },
      data: {
        academicYear,
        tuitionFee: Number(tuitionFee),
        labFee: Number(labFee),
        libraryFee: Number(libraryFee),
        sportsFee: Number(sportsFee),
        miscFee: Number(miscFee),
        totalFee,
      },
    });

    return NextResponse.json(feeStructure);
  } catch (error) {
    console.error("Error updating fee structure:", error);
    return NextResponse.json(
      { error: "Failed to update fee structure" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.feeStructure.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Fee structure deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee structure:", error);
    return NextResponse.json(
      { error: "Failed to delete fee structure" },
      { status: 500 }
    );
  }
}
