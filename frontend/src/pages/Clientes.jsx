import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function Clientes() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const clientes = [
        {
            id: 1,
            nome: "João Silva",
            email: "joao@email.com",
            telefone: "(11) 98765-4321",
            cpf: "123.456.789-00",
        },
        {
            id: 2,
            nome: "Maria Santos",
            email: "maria@email.com",
            telefone: "(11) 97654-3210",
            cpf: "987.654.321-00",
        },
        {
            id: 3,
            nome: "Pedro Costa",
            email: "pedro@email.com",
            telefone: "(11) 96543-2109",
            cpf: "456.789.123-00",
        },
    ];

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Cadastro de Clientes
                </h1>

                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
                >
                    + Novo Cliente
                </button>
            </div>

            {mostrarFormulario && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Novo Cliente</h2>

                    <form className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome *</label>
                            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Telefone</label>
                            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">CPF</label>
                            <input className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
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
                    placeholder="🔍  Buscar cliente..."
                    className="w-full border rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b text-slate-700">
                            <th className="py-3">Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>CPF</th>
                            <th className="text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} className="border-b last:border-none">
                                <td className="py-4">{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.cpf}</td>
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