import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders → lista pedidos
export async function GET() {
  const orders = await prisma.order.findMany({
    include: { products: { include: { product: true } }, user: true },
  });
  return NextResponse.json(orders);
}

// POST /api/orders → cria um pedido
export async function POST(req: Request) {
  const data = await req.json();
  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      products: {
        create: data.products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
      },
    },
  });
  return NextResponse.json(order);
}
