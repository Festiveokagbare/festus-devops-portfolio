// prisma/seed.js
import { PrismaClient, Role } from "@prisma/client"; // ✅ Import Role enum
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@fintrack.com";

  // Check if the admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("⚠️ Admin already exists:", existingAdmin.email);
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      fullName: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: Role.admin, // ✅ Use enum, not string
    },
  });

  console.log("✅ Admin created successfully:", admin.email);
}

main()
  .catch((error) => {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
