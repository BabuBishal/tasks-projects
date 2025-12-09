import { prisma } from '@/lib/prisma'
import { assignFeeForSemester } from '@/lib/utils/fee-assignment'
import { StudentFee } from '@prisma/client'

export async function syncFeesForSemesterChange(
  studentId: string,
  oldSemester: number,
  newSemester: number,
  scholarshipId?: string
): Promise<{ success: boolean; error?: string; added?: number; removed?: number }> {
  try {
    let addedCount = 0
    let removedCount = 0

    // If increasing semesters, assign fees for new semesters
    if (newSemester > oldSemester) {
      for (let sem = oldSemester + 1; sem <= newSemester; sem++) {
        const result = await assignFeeForSemester(studentId, sem, scholarshipId)
        if (result.success) {
          addedCount++
        }
        // Continue even if one fails (fee might already exist)
      }
    }

    // If decreasing semesters, remove fees for semesters beyond new value
    if (newSemester < oldSemester) {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: { programId: true },
      })

      if (!student) {
        return { success: false, error: 'Student not found' }
      }

      // Find fees for semesters that should be removed
      const feesToRemove = await prisma.studentFee.findMany({
        where: {
          studentId: studentId,
          feeStructure: {
            programSemester: {
              programId: student.programId,
              semesterNo: {
                gt: newSemester, // Greater than new semester
                lte: oldSemester, // Less than or equal to old semester
              },
            },
          },
        },
        include: {
          payments: true,
        },
      })

      // Check if any of these fees have payments
      const feesWithPayments = feesToRemove.filter(
        (fee: (typeof feesToRemove)[0]) => fee.payments.length > 0
      )

      if (feesWithPayments.length > 0) {
        return {
          success: false,
          error: `Cannot remove fees for semesters because they have existing payments`,
        }
      }

      // Delete fees that have no payments
      const deleted = await prisma.studentFee.deleteMany({
        where: {
          id: {
            in: feesToRemove.map(f => f.id),
          },
        },
      })

      removedCount = deleted.count
    }

    return {
      success: true,
      added: addedCount,
      removed: removedCount,
    }
  } catch (error: unknown) {
    return { success: false, error: (error as Error).message }
  }
}
