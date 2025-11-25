import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function makeUserAdmin() {
  try {
    // Get the first user (or you can specify by email)
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" },
    });

    if (!user) {
      console.log("No users found in database");
      return;
    }

    console.log(`Found user: ${user.name} (${user.email})`);

    // Check if profile exists
    let profile = await prisma.userProfile.findUnique({
      where: { userId: user.id },
    });

    if (profile) {
      // Update existing profile
      profile = await prisma.userProfile.update({
        where: { userId: user.id },
        data: { role: "Admin" },
      });
      console.log(`✅ Updated ${user.name} to Admin role`);
    } else {
      // Create new profile with Admin role
      profile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          role: "Admin",
        },
      });
      console.log(`✅ Created Admin profile for ${user.name}`);
    }

    console.log(`User ${user.name} is now an Administrator!`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

makeUserAdmin();
