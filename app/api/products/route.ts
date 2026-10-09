import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const file = formData.get("image") as File | null;
  const description = formData.get("description") as string;

  let imageUrl: string | null = null;

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + "-" + file.name;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);
    imageUrl = "/uploads/" + fileName;
  }

  const product = await prisma.product.create({
    data: { name, price, category, description, imageUrl },
  });


  

  return NextResponse.json(product);
}
