import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function PDV() {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState("");
    const [carrinho, setCarrinho] = useState([]);
    const [tipoVenda, setTipoVenda] = useState("avista");
    const [clienteId, setClienteId] = useState("");
    const [mostrarCrediarios, setMostrarCrediarios] = useState(false);
    const [crediarios, setCrediarios] = useState([]);

    async function carregarDados() {
        const produtosResponse = await api.get("/produtos");
        const clientesResponse = await api.get("/clientes");

        setProdutos(produtosResponse.data);
        setClientes(clientesResponse.data);
    }

    useEffect(() => {
        carregarDados();
    }, []);

    const produtosFiltrados = useMemo(() => {
        if (!busca) return [];

        return produtos.filter((produto) => {
            const termo = busca.toLowerCase();

            return (
                produto.nome?.toLowerCase().includes(termo) ||
                String(produto.id).includes(termo) ||
                String(produto.codigoBarras || "").includes(termo)
            );
        });
    }, [busca, produtos]);

    function adicionarProduto(produto) {
        const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);

        if (produtoNoCarrinho) {
            setCarrinho(
                carrinho.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                )
            );
        } else {
            setCarrinho([
                ...carrinho,
                {
                    ...produto,
                    quantidade: 1,
                },
            ]);
        }

        setBusca("");
    }

    function removerProduto(id) {
        setCarrinho(carrinho.filter((item) => item.id !== id));
    }

    function alterarQuantidade(id, quantidade) {
        if (quantidade <= 0) return removerProduto(id);

        setCarrinho(
            carrinho.map((item) =>
                item.id === id ? { ...item, quantidade: quantidade } : item
            )
        );
    }

    const total = carrinho.reduce(
        (acc, item) => acc + Number(item.preco) * item.quantidade,
        0
    );

    function finalizarVenda() {
        if (carrinho.length === 0) {
            alert("Adicione produtos ao carrinho.");
            return;
        }

        if (tipoVenda === "crediario" && !clienteId) {
            alert("Selecione um cliente para venda no crediário.");
            return;
        }

        if (tipoVenda === "crediario") {
            const cliente = clientes.find((c) => c.id === Number(clienteId));

            const novoCrediario = {
                id: Date.now(),
                cliente: cliente.nome,
                total,
                itens: carrinho,
                data: new Date().toLocaleDateString("pt-BR"),
            };

            setCrediarios([...crediarios, novoCrediario]);
            alert("Venda registrada como crediário.");
        } else {
            alert("Venda finalizada com sucesso.");
        }

        setCarrinho([]);
        setClienteId("");
        setTipoVenda("avista");
    }

    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-50 p-6 flex flex-col">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        PDV - Ponto de Venda
                    </h1>
                    <p className="text-slate-500">Venda rápida, à vista ou crediário</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setMostrarCrediarios(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-3 rounded-xl"
                    >
                        Crediários
                    </button>

                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
                    >
                        🏠 Início
                    </Link>
                </div>
            </header>

            <main className="grid grid-cols-[minmax(0,1fr)_445px] gap-4 flex-1 min-h-0">
                <section className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col min-h-0">
                    <h2 className="text-xl font-semibold mb-4 shrink-0">
                        Itens da Venda
                    </h2>

                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {carrinho.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-slate-400">
                                Nenhum produto adicionado
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="border-b text-slate-700">
                                        <th className="py-3">Produto</th>
                                        <th>Preço</th>
                                        <th>Qtd</th>
                                        <th>Subtotal</th>
                                        <th className="text-right">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {carrinho.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4">{item.nome}</td>
                                            <td>R$ {Number(item.preco).toFixed(2)}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantidade}
                                                    onChange={(e) =>
                                                        alterarQuantidade(item.id, Number(e.target.value))
                                                    }
                                                    className="w-24 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td>
                                                R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                                            </td>
                                            <td className="text-right">
                                                <button
                                                    onClick={() => removerProduto(item.id)}
                                                    className="text-red-600"
                                                >
                                                    🗑
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="mt-4 border border-gray-200 rounded-xl p-4 shrink-0 relative">
                        <label className="block text-sm font-semibold mb-2">
                            Buscar produto por código, código de barras ou nome
                        </label>

                        <input
                            autoFocus
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Digite ou escaneie o código de barras..."
                            className="w-full border rounded-xl px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {produtosFiltrados.length > 0 && (
                            <div className="absolute left-4 right-4 bottom-[92px] bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-20">
                                {produtosFiltrados.map((produto) => (
                                    <button
                                        key={produto.id}
                                        onClick={() => adicionarProduto(produto)}
                                        className="w-full flex justify-between px-4 py-3 hover:bg-blue-50 text-left border-b last:border-none"
                                    >
                                        <span>
                                            <strong>{produto.nome}</strong>
                                            <br />
                                            <small className="text-slate-500">
                                                Código: {produto.id} | Estoque: {produto.estoque}
                                            </small>
                                        </span>

                                        <span className="font-semibold">
                                            R$ {Number(produto.preco).toFixed(2)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <aside className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
                    <h2 className="text-2xl font-bold mb-6">Resumo</h2>

                    <div className="mb-6">
                        <div className="flex justify-between">
                            <span>Itens</span>
                            <strong>{carrinho.length}</strong>
                        </div>

                        <div className="flex justify-between text-2xl mt-1">
                            <span>Total</span>
                            <strong>R$ {total.toFixed(2)}</strong>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Tipo de venda
                        </label>

                        <select
                            value={tipoVenda}
                            onChange={(e) => setTipoVenda(e.target.value)}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="avista">À vista</option>
                            <option value="crediario">Crediário</option>
                        </select>
                    </div>

                    {tipoVenda === "crediario" && (
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">
                                Cliente
                            </label>

                            <select
                                value={clienteId}
                                onChange={(e) => setClienteId(e.target.value)}
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        onClick={finalizarVenda}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl"
                    >
                        Finalizar Venda
                    </button>
                </aside>
            </main>

            {mostrarCrediarios && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-[800px] max-h-[80vh] overflow-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Crediários dos Clientes</h2>

                            <button
                                onClick={() => setMostrarCrediarios(false)}
                                className="text-slate-500 hover:text-slate-900"
                            >
                                ✕
                            </button>
                        </div>

                        {crediarios.length === 0 ? (
                            <p className="text-slate-500">Nenhum crediário registrado.</p>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-3">Cliente</th>
                                        <th>Data</th>
                                        <th>Total</th>
                                        <th>Itens</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {crediarios.map((crediario) => (
                                        <tr key={crediario.id} className="border-b">
                                            <td className="py-3">{crediario.cliente}</td>
                                            <td>{crediario.data}</td>
                                            <td>R$ {crediario.total.toFixed(2)}</td>
                                            <td>{crediario.itens.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}