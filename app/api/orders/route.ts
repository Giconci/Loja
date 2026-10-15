import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/products/:id → busca produto específico
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔹 Antes era { params: { id: string } }, agora é Promise<{ id: string }>
) {
  const { id } = await context.params; // 🔹 Precisa de await para "desembrulhar" a Promise
  const productId = Number(id);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

// ✅ PUT /api/products/:id → atualiza produto
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔹 Também ajustado para Promise
) {
  const { id } = await context.params; // 🔹 await para pegar o id
  const data = await req.json();

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(product);
}

// ✅ DELETE /api/products/:id → exclui produto
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // 🔹 Ajustado para Promise
) {
  const { id } = await context.params; // 🔹 await para pegar o id

  await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Produto excluído" });
}
