import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-100 p-4 border-r">
            <h1 className="text-xl font-bold mb-6">Sistema de Vendas</h1>

            <nav className="space-y-2">
                <Link className="block p-2 rounded bg-blue-100 text-blue-600" to="/">
                    Dashboard
                </Link>

                <Link className="block p-2 rounded hover:bg-gray-200" to="/pdv">
                    PDV
                </Link>

                <Link className="block p-2 rounded hover:bg-gray-200" to="/relatorios">
                    Relatórios
                </Link>

                <Link className="block p-2 rounded hover:bg-gray-200" to="/produtos">
                    Produtos
                </Link>

                <Link className="block p-2 rounded hover:bg-gray-200" to="/estoque">
                    Estoque
                </Link>
            </nav>
        </div>
    );
}