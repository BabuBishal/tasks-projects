// export function cn(...classes: (string | undefined | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateJoinedYear(semester: number) {
  if (semester < 1 || semester > 8) {
    throw new Error("Semester must be between 1 and 8");
  }

  const currentYear = new Date().getFullYear();

  const yearsPassed = Math.ceil(semester / 2) - 1;

  const joinedYear = currentYear - yearsPassed;

  return joinedYear;
}

export const validatePaymentAmount = (
  amount: number,
  balance: number
): string => {
  if (amount <= 0) return "Amount must be greater than 0";
  if (amount > balance) return `Amount cannot exceed balance of ${balance}`;
  return "";
};

export const generateReceiptNumber = (): string => {
  return `RCPT-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
};

// 📁 In your API route/controller where you create students

/**
 * Calculate which academic year a semester falls into
 */
export function getAcademicYearForSemester(
  joinedYear: number,
  semesterNo: number
): string {
  const yearsPassed = Math.floor((semesterNo - 1) / 2);
  const baseYear = joinedYear + yearsPassed;
  return `${baseYear}/${String(baseYear + 1).slice(2)}`;
}

/**
 * Get semester start date
 * Odd semesters (1,3,5,7) start July 1st
 * Even semesters (2,4,6,8) start January 1st
 */
export function getSemesterStartDate(
  joinedYear: number,
  semesterNo: number
): Date {
  const isOddSemester = semesterNo % 2 === 1;
  const yearsPassed = Math.floor((semesterNo - 1) / 2);
  const baseYear = joinedYear + yearsPassed;

  if (isOddSemester) {
    return new Date(baseYear, 6, 1); // July 1st
  } else {
    return new Date(baseYear + 1, 0, 1); // January 1st (next year)
  }
}

/**
 * Calculate due date (3 months after semester start)
 */
export function getDueDate(startDate: Date): Date {
  const dueDate = new Date(startDate);
  dueDate.setMonth(dueDate.getMonth() + 3);
  return dueDate;
}

export const generateProgramPrefix = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .map((word) => word.toUpperCase().substring(0, 4))
    .join("");
