import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Gera o hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Tenta criar o usuário
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    return NextResponse.json(
      { message: "Usuário cadastrado!", user },
      { status: 201 }
    );
  } catch (error: any) {
    // Trata erro de email duplicado
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 400 }
      );
    }

    // Trata outros erros inesperados
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { error: "Erro interno no cadastro" },
      { status: 500 }
    );
  }
}
