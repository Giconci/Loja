import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function reset() {
  await prisma.product.deleteMany(); // apaga todos os produtos
  console.log("Produtos apagados!");
}

reset()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
