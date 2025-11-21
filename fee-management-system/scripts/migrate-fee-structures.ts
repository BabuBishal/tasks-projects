import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting fee structure migration...");

  // 1. Get all fee structures
  const allFeeStructures = await prisma.feeStructure.findMany({
    orderBy: { updatedAt: "desc" },
  });

  console.log(`Found ${allFeeStructures.length} fee structures.`);

  // 2. Group by programSemesterId
  const groupedBySemester: Record<string, typeof allFeeStructures> = {};

  for (const fee of allFeeStructures) {
    if (!groupedBySemester[fee.programSemesterId]) {
      groupedBySemester[fee.programSemesterId] = [];
    }
    groupedBySemester[fee.programSemesterId].push(fee);
  }

  // 3. Process duplicates
  for (const [semesterId, fees] of Object.entries(groupedBySemester)) {
    if (fees.length > 1) {
      console.log(
        `Processing duplicates for semester ${semesterId} (${fees.length} found)`
      );

      // The first one is the "winner" because we sorted by updatedAt desc
      const winner = fees[0];
      const losers = fees.slice(1);

      console.log(
        `Keeping fee structure ${winner.id}, deleting ${losers.length} others.`
      );

      for (const loser of losers) {
        // Update StudentFee records to point to the winner
        const updateResult = await prisma.studentFee.updateMany({
          where: { feeStructureId: loser.id },
          data: { feeStructureId: winner.id },
        });

        console.log(
          `  Moved ${updateResult.count} student fee records from ${loser.id} to ${winner.id}`
        );

        // Delete the loser
        await prisma.feeStructure.delete({
          where: { id: loser.id },
        });

        console.log(`  Deleted fee structure ${loser.id}`);
      }
    }
  }

  console.log("Migration completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
