import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

// schema de validação
const userSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").max(20, "Senha deve ter no máximo 20 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body recebido:", body);

    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.issues.map(e => ({ field: e.path.join("."), message: e.message })) },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    console.log("Email:", email, "Password:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash gerado:", hashedPassword);

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword }, // 👈 agora usa passwordHash
    });

    return NextResponse.json({ message: "Usuário cadastrado!", user }, { status: 201 });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json({ error: "Erro interno ao cadastrar usuário" }, { status: 500 });
  }
}
