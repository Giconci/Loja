// lib/auth.ts
import { signIn } from "next-auth/react";

export async function loginUser(email: string, password: string) {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
}

// 👇 Aqui encapsulamos o cadastro
export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro no cadastro");
  }

  return await res.json();
}
