import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function makeUserAdmin() {
  try {
    // Get the first user (or you can specify by email)
    let user = await prisma.user.findFirst({
      orderBy: { createdAt: 'asc' },
    })

    if (!user) {
      console.log('No users found in database')
      return
    }

    console.log(`Found user: ${user.name} (${user.email})`)

    // Update existing user
    user = await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    })
    console.log(`✅ Updated ${user.name} to Admin role`)

    console.log(`User ${user.name} is now an Administrator!`)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

makeUserAdmin()
