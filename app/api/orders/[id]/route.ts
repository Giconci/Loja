import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/:id → busca produto específico
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;
  const productId = Number(id);

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
  } catch {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

// PUT /api/products/:id → atualiza produto
export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const productId = Number(id);
  const data = await req.json();

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data,
    });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// DELETE /api/products/:id → exclui produto
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;
  const productId = Number(id);

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: "Produto excluído" });
  } catch {
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}
