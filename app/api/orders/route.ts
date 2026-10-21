import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/:id
export async function GET(
  req: NextRequest,
  context: any // 👈 simplifica e evita conflito de tipagem
) {
  const { id } = context.params;
  const orderId = Number(id);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar pedido" }, { status: 500 });
  }
}

// PUT /api/orders/:id
export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const orderId = Number(id);
  const data = await req.json();

  try {
    const order = await prisma.order.update({ where: { id: orderId }, data });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar pedido" }, { status: 500 });
  }
}

// DELETE /api/orders/:id
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;
  const orderId = Number(id);

  try {
    await prisma.order.delete({ where: { id: orderId } });
    return NextResponse.json({ message: "Pedido excluído" });
  } catch {
    return NextResponse.json({ error: "Erro ao excluir pedido" }, { status: 500 });
  }
}
