import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/products/:id → busca produto específico
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔹 Antes era { params: { id?: string } }, agora é Promise<{ id: string }>
): Promise<NextResponse> {
  const { id } = await context.params; // 🔹 Precisa de await para "desembrulhar" a Promise
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
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

// ✅ PUT /api/products/:id → atualiza produto
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔹 Também ajustado para Promise
): Promise<NextResponse> {
  const { id } = await context.params; // 🔹 await para pegar o id
  const productId = Number(id);
  const data = await request.json();

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// ✅ DELETE /api/products/:id → exclui produto
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 🔹 Ajustado para Promise
): Promise<NextResponse> {
  const { id } = await context.params; // 🔹 await para pegar o id
  const productId = Number(id);

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: "Produto excluído" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}
