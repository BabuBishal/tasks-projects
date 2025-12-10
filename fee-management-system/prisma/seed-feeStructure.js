import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config({ path: '.env' })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting fee structure seeding...\n')

  // Fetch all programs with semesters
  const programs = await prisma.program.findMany({
    include: { semesters: true },
  })

  // Define fee variations per program (you can customize as needed)
  const feeConfig = {
    'BSc CSIT': [30000, 32000, 34000, 36000, 38000, 40000, 42000, 45000],
    BBA: [25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000],
    BIM: [28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000],
  }

  for (const program of programs) {
    console.log(`📚 Creating fee structures for ${program.name}...`)

    for (const semester of program.semesters) {
      // Pick fee based on semester number from feeConfig
      const tuitionFee = feeConfig[program.name][semester.semesterNo - 1] ?? 30000
      const labFee = Math.floor(tuitionFee * 0.1) // 10% of tuition
      const libraryFee = 1000 + semester.semesterNo * 100
      const sportsFee = 500 + semester.semesterNo * 50
      const miscFee = 1500 + semester.semesterNo * 50
      const totalFee = tuitionFee + labFee + libraryFee + sportsFee + miscFee

      await prisma.feeStructure.create({
        data: {
          programSemesterId: semester.id,
          tuitionFee,
          labFee,
          libraryFee,
          sportsFee,
          miscFee,
          totalFee,
        },
      })
    }

    console.log(`✓ Fee structures created for ${program.name}`)
  }

  console.log('\n✨ Fee structure seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error('❌ Fee seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
