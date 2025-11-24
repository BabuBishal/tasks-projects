// scripts/migrate-passwords.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function migratePasswords() {
  try {
    const users = await prisma.user.findMany();

    console.log(`Found ${users.length} users`);

    for (const user of users) {
      // Skip if already hashed
      if (
        user.password.startsWith("$2a$") ||
        user.password.startsWith("$2b$")
      ) {
        console.log(`Skipped: ${user.email}`);
        continue;
      }

      // Hash and update
      const hashedPassword = await hash(user.password, 12);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      console.log(`Migrated: ${user.email}`);
    }

    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migratePasswords();
