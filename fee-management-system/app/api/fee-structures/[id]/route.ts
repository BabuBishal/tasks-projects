import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const body = await req.json();
    const { tuitionFee, labFee, libraryFee, sportsFee, miscFee } = body;

    const totalFee =
      (tuitionFee || 0) +
      (labFee || 0) +
      (libraryFee || 0) +
      (sportsFee || 0) +
      (miscFee || 0);

    const feeStructure = await prisma.feeStructure.update({
      where: { id: params.id },
      data: {
        tuitionFee: Number(tuitionFee),
        labFee: Number(labFee),
        libraryFee: Number(libraryFee),
        sportsFee: Number(sportsFee),
        miscFee: Number(miscFee),
        totalFee,
      },
    });

    return NextResponse.json(feeStructure);
  } catch (error: any) {
    console.error("Error updating fee structure:", error);
    const errorMessage = error?.message || "Failed to update fee structure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await prisma.feeStructure.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Fee structure deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting fee structure:", error);
    const errorMessage = error?.message || "Failed to delete fee structure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
