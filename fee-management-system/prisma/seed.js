import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env' })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...\n')

  // ====================================================================
  // 1️⃣ Create Admin User
  // ====================================================================
  const adminEmail = 'admin@example.com'
  const adminPassword = 'admin123' // change as needed
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        profile: { create: {} },
      },
    })
    console.log(`✅ Created admin user: ${adminUser.email}`)
  } else {
    console.log(`⚠️ Admin user already exists: ${existingAdmin.email}`)
  }
  console.log()

  // ====================================================================
  // 2️⃣ Create Programs
  // ====================================================================
  const programs = [
    { name: 'BSc CSIT', duration: 8 },
    { name: 'BBA', duration: 8 },
    { name: 'BIM', duration: 8 },
  ]

  const createdPrograms = []
  for (const p of programs) {
    const program = await prisma.program.create({ data: p })
    createdPrograms.push(program)
    console.log(`✅ Created program: ${program.name}`)
  }
  console.log()

  // ====================================================================
  // 3️⃣ Create Program Semesters
  // ====================================================================
  for (const program of createdPrograms) {
    for (let sem = 1; sem <= program.duration; sem++) {
      await prisma.programSemester.create({
        data: {
          semesterNo: sem,
          programId: program.id,
        },
      })
    }
    console.log(`✅ Created ${program.duration} semesters for ${program.name}`)
  }
  console.log()

  // ====================================================================
  // 4️⃣ Create Scholarships
  // ====================================================================
  const scholarships = [
    { name: 'Merit Scholarship (25%)', type: 'percentage', value: 25 },
    { name: 'Need-Based Scholarship (50%)', type: 'percentage', value: 50 },
    { name: 'Sports Scholarship (Fixed 5000)', type: 'fixed', value: 5000 },
  ]

  for (const s of scholarships) {
    await prisma.scholarship.create({ data: s })
    console.log(`✅ Created scholarship: ${s.name}`)
  }

  console.log('\n✨ Seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
