import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function Usuarios() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [busca, setBusca] = useState("");

    const usuarios = [
        {
            id: 1,
            nome: "Admin Sistema",
            email: "admin@sistema.com",
            perfil: "Administrador",
            status: "Ativo",
        },
        {
            id: 2,
            nome: "Carlos Gerente",
            email: "carlos@sistema.com",
            perfil: "Gerente",
            status: "Ativo",
        },
        {
            id: 3,
            nome: "Ana Vendedora",
            email: "ana@sistema.com",
            perfil: "Vendedor",
            status: "Ativo",
        },
    ];

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Cadastro de Usuários
                </h1>

                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
                >
                    + Novo Usuário
                </button>
            </div>

            {mostrarFormulario && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Novo Usuário</h2>

                    <form className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome *</label>
                            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <input
                                type="email"
                                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Perfil *</label>
                            <select className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Vendedor</option>
                                <option>Gerente</option>
                                <option>Administrador</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Senha *</label>
                            <input
                                type="password"
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
                    placeholder="🔍  Buscar usuário..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">Nome</th>
                            <th>Email</th>
                            <th>Perfil</th>
                            <th>Status</th>
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id} className="border-b last:border-none">
                                <td className="py-4">🛡️ {usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <span className="px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-700">
                                        {usuario.perfil}
                                    </span>
                                </td>
                                <td>
                                    <span className="px-3 py-1 rounded-md text-sm bg-green-100 text-green-700">
                                        {usuario.status}
                                    </span>
                                </td>
                                <td className="text-right space-x-4">
                                    <button className="text-blue-600">✎</button>
                                    <button className="text-red-600">🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}