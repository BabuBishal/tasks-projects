// Utility functions for calculating fee urgency levels

export type UrgencyLevel = "critical" | "high" | "medium" | "recent";

export interface UrgencyInfo {
  level: UrgencyLevel;
  label: string;
  color: string;
  badgeVariant: "danger" | "warning" | "info" | "success";
}

/**
 * Calculate urgency level based on days overdue
 * @param daysOverdue Number of days past the due date
 * @returns Urgency level classification
 */
export function calculateUrgencyLevel(daysOverdue: number): UrgencyLevel {
  if (daysOverdue >= 60) return "critical";
  if (daysOverdue >= 30) return "high";
  if (daysOverdue >= 15) return "medium";
  return "recent";
}

/**
 * Get urgency information including label and styling
 * @param daysOverdue Number of days past the due date
 * @returns Complete urgency information
 */
export function getUrgencyInfo(daysOverdue: number): UrgencyInfo {
  const level = calculateUrgencyLevel(daysOverdue);

  const urgencyMap: Record<UrgencyLevel, UrgencyInfo> = {
    critical: {
      level: "critical",
      label: "Critical",
      color: "text-red-700 dark:text-red-400",
      badgeVariant: "danger",
    },
    high: {
      level: "high",
      label: "High Priority",
      color: "text-orange-600 dark:text-orange-400",
      badgeVariant: "warning",
    },
    medium: {
      level: "medium",
      label: "Medium Priority",
      color: "text-yellow-600 dark:text-yellow-400",
      badgeVariant: "warning",
    },
    recent: {
      level: "recent",
      label: "Recent",
      color: "text-blue-600 dark:text-blue-400",
      badgeVariant: "info",
    },
  };

  return urgencyMap[level];
}

/**
 * Calculate payment percentage
 * @param paid Amount paid
 * @param totalFee Total fee amount
 * @returns Payment percentage (0-100)
 */
export function calculatePaymentPercentage(
  paid: number,
  totalFee: number
): number {
  if (totalFee === 0) return 0;
  return Math.round((paid / totalFee) * 100);
}

/**
 * Get payment status label
 * @param percentage Payment percentage
 * @returns Status label
 */
export function getPaymentStatusLabel(percentage: number): string {
  if (percentage === 0) return "Fully Unpaid";
  if (percentage >= 90) return "Nearly Complete";
  return "Partially Paid";
}

/**
 * Calculate how many semesters behind a student is
 * @param currentSemester Student's current semester
 * @param overdueSemester The semester that is overdue
 * @returns Number of semesters behind
 */
export function calculateSemestersBehind(
  currentSemester: number,
  overdueSemester: number
): number {
  return Math.max(0, currentSemester - overdueSemester);
}

/**
 * Sort overdue fees by urgency (critical first)
 * @param fees Array of fees with daysOverdue
 * @returns Sorted array
 */
export function sortByUrgency<T extends { daysOverdue: number }>(
  fees: T[]
): T[] {
  return [...fees].sort((a, b) => {
    const urgencyA = calculateUrgencyLevel(a.daysOverdue);
    const urgencyB = calculateUrgencyLevel(b.daysOverdue);

    const urgencyOrder: Record<UrgencyLevel, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      recent: 3,
    };

    // First sort by urgency level
    const levelDiff = urgencyOrder[urgencyA] - urgencyOrder[urgencyB];
    if (levelDiff !== 0) return levelDiff;

    // Within same level, sort by days overdue (descending)
    return b.daysOverdue - a.daysOverdue;
  });
}
