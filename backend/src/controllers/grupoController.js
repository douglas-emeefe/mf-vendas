import * as grupoService from "../services/grupoService.js";

export const criar = async (req, res) => {
    try {
        const grupo = await grupoService.criarGrupo(req.body);
        return res.status(201).json(grupo);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const listar = async (req, res) => {
    try {
        const grupos = await grupoService.listarGrupos();
        return res.json(grupos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        await grupoService.deletarGrupo(req.params.id);
        return res.json({ message: "Grupo deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};