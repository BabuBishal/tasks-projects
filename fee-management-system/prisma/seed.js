import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env" });

const prisma = new PrismaClient();


async function main() {
  console.log("🌱 Starting database seeding...\n");

  // ====================================================================
  // 1️⃣ Clear existing data
  // ====================================================================
  console.log("🗑️  Clearing existing data...");
  await prisma.payment.deleteMany();
  await prisma.studentFee.deleteMany();
  await prisma.studentScholarship.deleteMany();
  await prisma.student.deleteMany();
  await prisma.feeStructure.deleteMany();
  await prisma.programSemester.deleteMany();
  await prisma.program.deleteMany();
  await prisma.scholarship.deleteMany();
  console.log("✓ Cleared all existing data\n");

  // ====================================================================
  // 2️⃣ Create Programs (all with 8 semesters)
  // ====================================================================
  console.log("📚 Creating Programs (all 8 semesters)...");

  const programs = [
    { name: "BSc CSIT", duration: 8 },
    { name: "BBA", duration: 8 },
    { name: "BIM", duration: 8 },
  ];

  const createdPrograms = [];
  for (const p of programs) {
    const program = await prisma.program.create({ data: p });
    createdPrograms.push(program);
    console.log(`✓ Created program: ${program.name}`);
  }
  console.log();

  // ====================================================================
  // 3️⃣ Create Program Semesters (for each program)
  // ====================================================================
  console.log("📖 Creating Program Semesters...");

  const createdSemesters = [];
  for (const program of createdPrograms) {
    for (let sem = 1; sem <= program.duration; sem++) {
      const semester = await prisma.programSemester.create({
        data: {
          semesterNo: sem,
          programId: program.id,
        },
      });
      createdSemesters.push(semester);
    }
    console.log(`✓ Created ${program.duration} semesters for ${program.name}`);
  }
  console.log();

  // ====================================================================
  // 4️⃣ Create Scholarships
  // ====================================================================
  console.log("🎓 Creating Scholarships...");

  const scholarshipData = [
    { name: "Merit Scholarship (25%)", type: "percentage", value: 25 },
    { name: "Need-Based Scholarship (50%)", type: "percentage", value: 50 },
    { name: "Sports Scholarship (Fixed 5000)", type: "fixed", value: 5000 },
  ];

  const createdScholarships = [];
  for (const s of scholarshipData) {
    const sch = await prisma.scholarship.create({ data: s });
    createdScholarships.push(sch);
    console.log(`✓ Created scholarship: ${sch.name}`);
  }
  console.log();

  // ====================================================================
  // 5️⃣ Create Fee Structures for Past 4 Years
  // ====================================================================
  console.log("💰 Creating Fee Structures for Past 4 Years...");
  console.log(
    "📌 KEY CONCEPT: Fee structures for 4 academic years (2022/23 through 2025/26)\n"
  );

  const academicYears = ["2022/23", "2023/24", "2024/25", "2025/26"];

  for (const year of academicYears) {
    console.log(`Creating fee structures for ${year}...`);

    for (const semester of createdSemesters) {
      const feeData = {
        tuitionFee: 25000,
        labFee: 3000,
        libraryFee: 1000,
        sportsFee: 500,
        miscFee: 1500,
        totalFee: 31000,
      };

      await prisma.feeStructure.create({
        data: {
          programSemesterId: semester.id,
          academicYear: year,
          ...feeData,
        },
      });
    }

    console.log(
      `  ✓ Created fee structures for all ${createdSemesters.length} semesters\n`
    );
  }

  // ====================================================================
  // 6️⃣ Display Summary with Examples
  // ====================================================================
  console.log("=".repeat(80));
  console.log("📊 SEEDING SUMMARY");
  console.log("=".repeat(80));

  const programCount = await prisma.program.count();
  const semesterCount = await prisma.programSemester.count();
  const feeStructureCount = await prisma.feeStructure.count();
  const scholarshipCount = await prisma.scholarship.count();

  console.log(`
✅ Programs: ${programCount}
✅ Program Semesters: ${semesterCount}
✅ Fee Structures: ${feeStructureCount}
✅ Scholarships: ${scholarshipCount}

🎯 Academic Years Configured: ${academicYears.join(", ")}

📋 CORRECTED SYSTEM DESIGN:
   
   🔑 KEY CHANGE: Fees are now generated ONLY for semesters the student has completed/is in
   
   Semester Schedule:
   - Academic Year (e.g., 2025/26): July 2025 → June 2026
   - Odd Semesters (1, 3, 5, 7): Start July 1st of academic year
   - Even Semesters (2, 4, 6, 8): Start January 1st (6 months later)
   - Due Date: 3 months after semester start (October/April)
   
   💡 Both Sem 7 and Sem 8 can be in the same academic year:
      • Sem 7: July 1, 2025 (Academic Year: 2025/26)
      • Sem 8: Jan 1, 2026 (Academic Year: 2025/26)

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   📚 EXAMPLE SCENARIOS:

   Example 1: Student joins in 2024, currently in Semester 3
   ┌─────────────┬──────────────┬─────────────┬─────────────┐
   │ Semester    │ Academic Yr  │ Start Date  │ Due Date    │
   ├─────────────┼──────────────┼─────────────┼─────────────┤
   │ Sem 1       │ 2024/25      │ Jul 1, 2024 │ Oct 1, 2024 │
   │ Sem 2       │ 2024/25      │ Jan 1, 2025 │ Apr 1, 2025 │
   │ Sem 3 ⭐    │ 2025/26      │ Jul 1, 2025 │ Oct 1, 2025 │
   └─────────────┴──────────────┴─────────────┴─────────────┘
   → 3 StudentFee records created

   Example 2: Student joins in 2023, currently in Semester 5
   ┌─────────────┬──────────────┬─────────────┬─────────────┐
   │ Semester    │ Academic Yr  │ Start Date  │ Due Date    │
   ├─────────────┼──────────────┼─────────────┼─────────────┤
   │ Sem 1       │ 2023/24      │ Jul 1, 2023 │ Oct 1, 2023 │
   │ Sem 2       │ 2023/24      │ Jan 1, 2024 │ Apr 1, 2024 │
   │ Sem 3       │ 2024/25      │ Jul 1, 2024 │ Oct 1, 2024 │
   │ Sem 4       │ 2024/25      │ Jan 1, 2025 │ Apr 1, 2025 │
   │ Sem 5 ⭐    │ 2025/26      │ Jul 1, 2025 │ Oct 1, 2025 │
   └─────────────┴──────────────┴─────────────┴─────────────┘
   → 5 StudentFee records created

   Example 3: New student joins in 2025, Semester 1
   ┌─────────────┬──────────────┬─────────────┬─────────────┐
   │ Semester    │ Academic Yr  │ Start Date  │ Due Date    │
   ├─────────────┼──────────────┼─────────────┼─────────────┤
   │ Sem 1 ⭐    │ 2025/26      │ Jul 1, 2025 │ Oct 1, 2025 │
   └─────────────┴──────────────┴─────────────┴─────────────┘
   → 1 StudentFee record created

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 IMPLEMENTATION IN YOUR API:

   When creating a student, use this logic:

   \`\`\`typescript
   // In your student creation API
   const joinedYear = 2024; // or from form
   const currentSemester = 3; // from form
   
   // Generate fees for semesters 1 through currentSemester
   for (let sem = 1; sem <= currentSemester; sem++) {
     const academicYear = getAcademicYearForSemester(joinedYear, sem);
     const startDate = getSemesterStartDate(joinedYear, sem);
     const dueDate = getDueDate(startDate);
     
     // Find the fee structure
     const feeStructure = await prisma.feeStructure.findFirst({
       where: {
         programSemester: {
           programId: student.programId,
           semesterNo: sem
         },
         academicYear: academicYear
       }
     });
     
     // Calculate discount if scholarship exists
     const discount = calculateDiscount(scholarship, feeStructure.totalFee);
     const payableFee = feeStructure.totalFee - discount;
     
     // Create StudentFee
     await prisma.studentFee.create({
       data: {
         studentId: student.id,
         feeStructureId: feeStructure.id,
         academicYear: academicYear,
         originalFee: feeStructure.totalFee,
         discount: discount,
         payableFee: payableFee,
         balance: payableFee,
         status: "Pending",
         dueDate: dueDate
       }
     });
   }
   \`\`\`

💡 BENEFITS:
   ✓ Only relevant fees are created
   ✓ Accurate academic year mapping
   ✓ Proper due dates based on semester start
   ✓ No unnecessary fee records
   ✓ Clear tracking of payment history
  `);

  console.log("\n" + "=".repeat(80));
  console.log("✨ Seeding completed successfully!\n");
  
  console.log("📌 HELPER FUNCTIONS AVAILABLE:");
  console.log("   - getAcademicYearForSemester(joinedYear, semesterNo)");
  console.log("   - getSemesterStartDate(joinedYear, semesterNo)");
  console.log("   - getDueDate(startDate)");
  console.log("\n   Copy these functions to your student creation API!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });