import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/products/:id → busca produto específico
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);

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
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(product);
}

// DELETE /api/products/:id → exclui produto
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Produto excluído" });
}
