import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  const carregarProdutos = async () => {
    const res = await api.get("/produtos");
    setProdutos(res.data);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const cadastrar = async (e) => {
    e.preventDefault();

    await api.post("/produtos", {
      nome,
      preco: Number(preco),
      estoque: Number(estoque)
    });

    setNome("");
    setPreco("");
    setEstoque("");

    carregarProdutos();
  };

  return (
    <div>
      <h1>Produtos</h1>

      <form onSubmit={cadastrar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          placeholder="Estoque"
          type="number"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} - Estoque: {p.estoque}
          </li>
        ))}
      </ul>
    </div>
  );
}