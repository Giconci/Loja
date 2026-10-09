import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("senha123", 10);

  // 🔹 Cria ou mantém o usuário admin
  await prisma.user.upsert({
    where: { email: "admin@teste.com" },
    update: { passwordHash }, // pode atualizar campos se quiser
    create: {
      name: "Admin",
      email: "admin@teste.com",
      passwordHash,
      role: "admin",
    },
  });

  // 🔹 Cria alguns produtos de exemplo
  await prisma.product.createMany({
    data: [
      {
        name: "Camiseta",
        description: "Camiseta básica de algodão",
        price: 59.9,
        imageUrl: "/images/camiseta.png",
        stock: 100,
        category: "Roupas",
      },
      {
        name: "Tênis",
        description: "Tênis esportivo confortável",
        price: 199.9,
        imageUrl: "/images/tenis.png",
        stock: 50,
        category: "Calçados",
      },
    ],
    skipDuplicates: true, // 🔹 evita duplicar se já existir
  });

  console.log("Seed concluído com admin e produtos!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
