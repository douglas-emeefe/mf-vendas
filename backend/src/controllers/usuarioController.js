import * as usuarioService from "../services/usuarioService.js";

export const criar = async (req, res) => {
    try {
        const usuario = await usuarioService.criarUsuario(req.body);

        const { senha, ...usuarioSemSenha } = usuario;
        return res.status(201).json(usuarioSemSenha);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const listar = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        await usuarioService.deletarUsuario(req.params.id);
        return res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};