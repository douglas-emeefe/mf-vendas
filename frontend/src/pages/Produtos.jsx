import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { api } from "../services/api";

export default function Produtos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarGrupo, setMostrarGrupo] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [busca, setBusca] = useState("");

    const [novoGrupo, setNovoGrupo] = useState("");

    const [form, setForm] = useState({
        nome: "",
        codigoBarras: "",
        grupoId: "",
        preco: 0,
        custo: 0,
        estoque: 0,
    });

    async function carregarProdutos() {
        const response = await api.get("/produtos");
        setProdutos(response.data);
    }

    async function carregarGrupos() {
        const response = await api.get("/grupos");
        setGrupos(response.data);
    }

    useEffect(() => {
        carregarProdutos();
        carregarGrupos();
    }, []);

    async function salvarProduto(e) {
        e.preventDefault();

        await api.post("/produtos", {
            nome: form.nome,
            codigoBarras: form.codigoBarras,
            grupoId: form.grupoId ? Number(form.grupoId) : null,
            preco: Number(form.preco),
            custo: Number(form.custo),
            estoque: Number(form.estoque),
        });

        setForm({
            nome: "",
            codigoBarras: "",
            grupoId: "",
            preco: 0,
            custo: 0,
            estoque: 0,
        });

        setMostrarFormulario(false);
        carregarProdutos();
    }

    async function salvarGrupo(e) {
        e.preventDefault();

        await api.post("/grupos", {
            nome: novoGrupo,
        });

        setNovoGrupo("");
        setMostrarGrupo(false);
        carregarGrupos();
    }

    async function deletarProduto(id) {
        await api.delete(`/produtos/${id}`);
        carregarProdutos();
    }

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    function calcularMargem(produto) {
        if (!produto.custo || produto.custo <= 0) return "0.0%";

        const margem = ((produto.preco - produto.custo) / produto.preco) * 100;
        return `${margem.toFixed(1)}%`;
    }

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Cadastro de Produtos
                </h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => setMostrarGrupo(true)}
                        className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-5 py-3 rounded-xl"
                    >
                        + Novo Grupo
                    </button>

                    <button
                        onClick={() => setMostrarFormulario(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
                    >
                        + Novo Produto
                    </button>
                </div>
            </div>

            {mostrarGrupo && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Novo Grupo</h2>

                    <form onSubmit={salvarGrupo} className="flex gap-3">
                        <input
                            required
                            placeholder="Nome do grupo"
                            value={novoGrupo}
                            onChange={(e) => setNovoGrupo(e.target.value)}
                            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl"
                        >
                            Salvar
                        </button>

                        <button
                            type="button"
                            onClick={() => setMostrarGrupo(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-slate-800 font-semibold px-5 py-3 rounded-xl"
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}

            {mostrarFormulario && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Novo Produto</h2>

                    <form onSubmit={salvarProduto} className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome *</label>
                            <input
                                required
                                value={form.nome}
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Código de Barras
                            </label>
                            <input
                                value={form.codigoBarras}
                                onChange={(e) =>
                                    setForm({ ...form, codigoBarras: e.target.value })
                                }
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Grupo</label>
                            <select
                                // required
                                value={form.grupoId}
                                onChange={(e) => setForm({ ...form, grupoId: e.target.value })}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sem grupo</option>
                                {grupos.map((grupo) => (
                                    <option key={grupo.id} value={grupo.id}>
                                        {grupo.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Preço de Venda
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.preco}
                                onChange={(e) => setForm({ ...form, preco: e.target.value })}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Custo</label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.custo}
                                onChange={(e) => setForm({ ...form, custo: e.target.value })}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Estoque Inicial
                            </label>
                            <input
                                type="number"
                                value={form.estoque}
                                onChange={(e) => setForm({ ...form, estoque: e.target.value })}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl"
                            >
                                Salvar
                            </button>

                            <button
                                type="button"
                                onClick={() => setMostrarFormulario(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-slate-800 font-semibold px-5 py-3 rounded-xl"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <input
                    placeholder="🔍  Buscar produto..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">Nome</th>
                            <th>Cód. Barras</th>
                            <th>Grupo</th>
                            <th>Custo</th>
                            <th>Preço</th>
                            <th>Margem</th>
                            <th>Estoque</th>
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtosFiltrados.map((produto) => (
                            <tr key={produto.id} className="border-b last:border-none">
                                <td className="py-4">{produto.nome}</td>
                                <td>{produto.codigoBarras || "-"}</td>
                                <td>{produto.grupo?.nome || "-"}</td>
                                <td>R$ {Number(produto.custo || 0).toFixed(2)}</td>
                                <td>R$ {Number(produto.preco || 0).toFixed(2)}</td>
                                <td className="text-green-600">{calcularMargem(produto)}</td>
                                <td>{produto.estoque}</td>
                                <td className="text-right space-x-4">
                                    <button className="text-blue-600">✎</button>
                                    <button
                                        onClick={() => deletarProduto(produto.id)}
                                        className="text-red-600"
                                    >
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}