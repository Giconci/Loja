"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [produtos, setProdutos] = useState<any[]>([]);

  // 🔹 Estados para edição
  const [editando, setEditando] = useState<any>(null);
  const [nomeEdit, setNomeEdit] = useState("");
  const [precoEdit, setPrecoEdit] = useState("");
  const [categoriaEdit, setCategoriaEdit] = useState("");
  const [imagemEdit, setImagemEdit] = useState<File | null>(null); // 🔹 MUDANÇA
  const [descricaoEdit, setDescricaoEdit] = useState("");

  // 🔹 Estados para criação
  const [criando, setCriando] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaImagem, setNovaImagem] = useState<File | null>(null); // 🔹 MUDANÇA
  const [novaDescricao, setNovaDescricao] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  const excluirProduto = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const iniciarEdicao = (produto: any) => {
    setEditando(produto);
    setNomeEdit(produto.name);
    setPrecoEdit(produto.price);
    setCategoriaEdit(produto.category || "");
    setImagemEdit(null); // 🔹 não carrega string, só novo upload
  };

  const salvarEdicao = async () => {
    const formData = new FormData();
    formData.append("name", nomeEdit);
    formData.append("price", precoEdit);
    formData.append("category", categoriaEdit);
    formData.append("description", descricaoEdit);
    if (imagemEdit) formData.append("image", imagemEdit);

    const res = await fetch(`/api/products/${editando.id}`, {
      method: "PUT",
      body: formData,
    });
    const produtoAtualizado = await res.json();

    setProdutos(produtos.map((p) => (p.id === editando.id ? produtoAtualizado : p)));
    setEditando(null);
  };

  const criarProduto = async () => {
    const formData = new FormData();
    formData.append("name", novoNome);
    formData.append("price", novoPreco);
    formData.append("category", novaCategoria);
    formData.append("description", novaDescricao);
    if (novaImagem) formData.append("image", novaImagem);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    const produtoCriado = await res.json();
    setProdutos([...produtos, produtoCriado]);
    setCriando(false);
    setNovoNome("");
    setNovoPreco("");
    setNovaCategoria("");
    setNovaImagem(null);
  };

  if (status === "loading") return <p>Carregando...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }
  if (session.user.role !== "admin") {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Admin</h1>
      <p>Bem-vindo, {session.user.name}!</p>

      <button
        onClick={() => setCriando(true)}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Novo Produto
      </button>

      <table className="w-full border mt-6">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Categoria</th>
            <th className="border p-2">Imagem</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">R$ {p.price}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="h-16 w-16 object-cover" />
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => iniciarEdicao(p)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirProduto(p.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Modal de edição */}
      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
            <input
              type="text"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="number"
              value={precoEdit}
              onChange={(e) => setPrecoEdit(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              value={categoriaEdit}
              onChange={(e) => setCategoriaEdit(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImagemEdit(file);
              }}
              className="border p-2 mr-2"
            />
            <div className="mt-4">
              <button
                onClick={salvarEdicao}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditando(null)}
                className="bg-gray-500 text-white px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Modal de criação */}
      {criando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            
            <input
              type="text"
              placeholder="Nome"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="number"
              placeholder="Preço"
              value={novoPreco}
              onChange={(e) => setNovoPreco(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setNovaImagem(file);
              }}
              className="border p-2 mr-2"
            />
 <input
  type="text"
  placeholder="Descrição"
  value={novaDescricao}
  onChange={(e) => setNovaDescricao(e.target.value)}
  className="border p-2 mr-2"
/>




            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={criarProduto}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Salvar
              </button>
              <button
                onClick={() => setCriando(false)}
                className="bg-gray-500 text-white px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div> // 🔹 fechamento da div principal
  );
}
