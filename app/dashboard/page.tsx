"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    redirect("/login"); // 🔑 Se não estiver logado, volta para login
  }

  return (
    <div className="p-6">
      <h1>Bem-vindo, {session.user?.name}!</h1>
      <p>Você está no ambiente principal da loja.</p>
    </div>
  );
}
