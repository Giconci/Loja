import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/products/:id → busca produto específico
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // <-- params é uma Promise
) {
  const { id } = await context.params; // ✅ precisa dar await
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

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

// PUT /api/products/:id → atualiza produto
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const productId = parseInt(id, 10);
  const data = await req.json();

  const product = await prisma.product.update({
    where: { id: productId },
    data,
  });
  return NextResponse.json(product);
}

// DELETE /api/products/:id → exclui produto
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const productId = parseInt(id, 10);

  await prisma.product.delete({ where: { id: productId } });
  return NextResponse.json({ message: "Produto excluído" });
}
