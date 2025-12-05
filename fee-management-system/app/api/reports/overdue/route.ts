import { NextResponse } from "next/server";
import { calculateOverdueFees } from "@/lib/utils/fee-assignment";

/**
 * GET /api/reports/overdue
 * Calculate and update overdue fees status
 * Returns list of fee IDs that were updated to overdue status
 */
export async function GET() {
  try {
    const updatedFeeIds = await calculateOverdueFees();

    return NextResponse.json(
      {
        success: true,
        message: `Updated ${updatedFeeIds.length} fees to overdue status`,
        updatedCount: updatedFeeIds.length,
        feeIds: updatedFeeIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating overdue fees:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to calculate overdue fees",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
