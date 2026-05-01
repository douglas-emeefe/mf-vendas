import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { api } from "../services/api";

export default function Clientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [clienteEditandoId, setClienteEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  function editarCliente(cliente) {
    setClienteEditandoId(cliente.id);

    setForm({
      nome: cliente.nome || "",
      email: cliente.email || "",
      telefone: cliente.telefone || "",
      cpf: cliente.cpf || "",
    });

    setMostrarFormulario(true);
  }

  async function carregarClientes() {
    const response = await api.get("/clientes");
    setClientes(response.data);
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  async function salvarCliente(e) {
    e.preventDefault();

    const dados = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
    };

    if (clienteEditandoId) {
      await api.put(`/clientes/${clienteEditandoId}`, dados);
    } else {
      await api.post("/clientes", dados);
    }

    setForm({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
    });

    setClienteEditandoId(null);
    setMostrarFormulario(false);
    carregarClientes();
  }

  async function deletarCliente(id) {
    await api.delete(`/clientes/${id}`);
    carregarClientes();
  }

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
          <h2 className="text-xl font-semibold mb-6">
            {clienteEditandoId ? "Editar Cliente" : "Novo Cliente"}
          </h2>

          <form onSubmit={salvarCliente} className="grid grid-cols-2 gap-5">
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
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                value={form.telefone}
                onChange={(e) =>
                  setForm({ ...form, telefone: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CPF</label>
              <input
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
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
                onClick={() => {
                  setMostrarFormulario(false);
                  setClienteEditandoId(null);
                  setForm({
                    nome: "",
                    email: "",
                    telefone: "",
                    cpf: "",
                  });
                }}
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
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="max-h-[430px] overflow-y-auto pr-2">
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
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="border-b last:border-none">
                  <td className="py-4">{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone || "-"}</td>
                  <td>{cliente.cpf || "-"}</td>
                  <td className="text-right space-x-4">
                    <button
                      onClick={() => editarCliente(cliente)}
                      className="text-blue-600"
                    >
                      ✎
                    </button>

                    <button
                      onClick={() => deletarCliente(cliente.id)}
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
      </div>
    </DashboardLayout>
  );
}