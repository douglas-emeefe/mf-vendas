import DashboardLayout from "../layout/DashboardLayout";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Vendas do Mês</p>
                    <h2 className="text-2xl font-bold mt-2">R$ 24.500,00</h2>
                    <span className="text-green-500 text-sm">+12.5%</span>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Total de Vendas</p>
                    <h2 className="text-2xl font-bold mt-2">342</h2>
                    <span className="text-blue-500 text-sm">+8.2%</span>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Clientes Ativos</p>
                    <h2 className="text-2xl font-bold mt-2">1.284</h2>
                    <span className="text-purple-500 text-sm">+15.3%</span>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500">Ticket Médio</p>
                    <h2 className="text-2xl font-bold mt-2">R$ 71,64</h2>
                    <span className="text-orange-500 text-sm">+5.1%</span>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow h-64">
                    <h2 className="font-semibold mb-2">Vendas Mensais</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow h-64">
                    <h2 className="font-semibold mb-2">Produtos Mais Vendidos</h2>
                </div>
            </div>
        </DashboardLayout>
    );
}