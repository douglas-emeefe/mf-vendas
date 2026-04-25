import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [cadastrosAberto, setCadastrosAberto] = useState(true);

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
            <div className="h-[72px] flex items-center px-6 border-b">
                <h1 className="text-xl font-bold text-slate-900">Sistema de Vendas</h1>
            </div>

            <nav className="p-4 space-y-2 text-slate-700">
                <Link to="/" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                    Dashboard
                </Link>

                <Link to="/pdv" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                    PDV
                </Link>

                <Link to="/relatorios" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                    Relatórios
                </Link>

                <button
                    type="button"
                    onClick={() => setCadastrosAberto(!cadastrosAberto)}
                    className="w-full flex justify-between items-center px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
                >
                    <span>Cadastros</span>
                    <span>{cadastrosAberto ? "⌃" : "⌄"}</span>
                </button>

                {cadastrosAberto && (
                    <div className="ml-4 space-y-1">
                        <Link to="/clientes" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                            Clientes
                        </Link>

                        <Link to="/produtos" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                            Produtos
                        </Link>

                        <Link to="/usuarios" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                            Usuários
                        </Link>
                    </div>
                )}

                <Link to="/estoque" className="block px-4 py-3 rounded-xl hover:bg-blue-50">
                    Estoque
                </Link>
            </nav>
        </aside>
    );
}