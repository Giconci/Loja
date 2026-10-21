import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("senha123", 10);

  // 🔹 Cria ou mantém o usuário admin (sem duplicar)
  await prisma.user.upsert({
    where: { email: "admin@teste.com" },
    update: { passwordHash },
    create: {
      name: "Admin",
      email: "admin@teste.com",
      passwordHash,
      role: "admin",
    },
  });

  console.log("Seed concluído com admin!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
