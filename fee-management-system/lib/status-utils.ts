// lib/status-utils.ts

/**
 * Valid fee status values as defined in the Prisma schema
 */
export type FeeStatus = "Paid" | "Partial" | "Pending" | "Overdue";

/**
 * Student status includes "No Fees" for students without any fee records
 */
export type StudentStatus = FeeStatus | "No Fees";

/**
 * Status constants to avoid typos and ensure consistency
 */
export const FEE_STATUS = {
  PAID: "Paid" as const,
  PARTIAL: "Partial" as const,
  PENDING: "Pending" as const,
  OVERDUE: "Overdue" as const,
} as const;

export const STUDENT_STATUS = {
  ...FEE_STATUS,
  NO_FEES: "No Fees" as const,
} as const;

/**
 * Calculate the payment status for a student fee
 * This is the single source of truth for status determination
 *
 * Logic:
 * 1. If balance is 0 → "Paid"
 * 2. If paid > 0 and balance > 0:
 *    - If past due date → "Overdue"
 *    - Otherwise → "Partial"
 * 3. If paid = 0 (no payment made):
 *    - If past due date → "Overdue"
 *    - Otherwise → "Pending"
 *
 * @param fee - Fee object with balance, paid, payableFee, and dueDate
 * @returns The calculated fee status
 */
export function calculateFeeStatus(fee: {
  balance: number;
  paid: number;
  payableFee: number;
  dueDate: Date | string;
}): FeeStatus {
  const now = new Date();
  const dueDate = new Date(fee.dueDate);
  const isOverdue = dueDate < now;

  // Fully paid
  if (fee.balance === 0) {
    return FEE_STATUS.PAID;
  }

  // Has made some payment but not fully paid
  if (fee.paid > 0 && fee.balance > 0) {
    return isOverdue ? FEE_STATUS.OVERDUE : FEE_STATUS.PARTIAL;
  }

  // No payment made yet
  return isOverdue ? FEE_STATUS.OVERDUE : FEE_STATUS.PENDING;
}

/**
 * Calculate overall student payment status based on all fees
 * Used for dashboard statistics and student filtering
 *
 * Logic:
 * - If no fees → "No Fees"
 * - Otherwise, use the status of the most recent fee (by due date)
 *
 * @param fees - Array of fee objects
 * @returns The calculated student status
 */
export function calculateStudentStatus(
  fees: Array<{
    balance: number;
    paid: number;
    payableFee: number;
    dueDate: Date | string;
  }>
): StudentStatus {
  if (fees.length === 0) {
    return STUDENT_STATUS.NO_FEES;
  }

  // Get the latest fee (most recent by due date)
  const latestFee = fees.reduce((latest, fee) => {
    const latestDueDate = new Date(latest.dueDate);
    const currentDueDate = new Date(fee.dueDate);
    return currentDueDate > latestDueDate ? fee : latest;
  });

  return calculateFeeStatus(latestFee);
}

/**
 * Normalize status string to match the canonical format
 * Handles case variations and returns the proper capitalized version
 *
 * @param status - Status string in any case
 * @returns Normalized status or null if invalid
 */
export function normalizeStatus(status: string): FeeStatus | null {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "paid":
      return FEE_STATUS.PAID;
    case "partial":
      return FEE_STATUS.PARTIAL;
    case "pending":
      return FEE_STATUS.PENDING;
    case "overdue":
      return FEE_STATUS.OVERDUE;
    default:
      return null;
  }
}
