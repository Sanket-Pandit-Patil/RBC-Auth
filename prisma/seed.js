import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@gmail.com" },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created successfully");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });