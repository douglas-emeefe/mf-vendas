import * as clienteService from "../services/clienteService.js";

export const criar = async (req, res) => {
    try {
        const cliente = await clienteService.criarCliente(req.body);
        return res.status(201).json(cliente);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const listar = async (req, res) => {
    try {
        const clientes = await clienteService.listarClientes();
        return res.json(clientes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const atualizar = async (req, res) => {
    try {
        const cliente = await clienteService.atualizarCliente(
            req.params.id,
            req.body
        );

        return res.json(cliente);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        await clienteService.deletarCliente(req.params.id);
        return res.json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};