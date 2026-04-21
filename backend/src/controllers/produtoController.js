import * as produtoService from "../services/produtoService.js";

export const criar = async (req, res) => {
  try {
    const produto = await produtoService.criarProduto(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listar = async (req, res) => {
  try {
    const produtos = await produtoService.listarProdutos();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const produto = await produtoService.buscarProdutoPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const produto = await produtoService.atualizarProduto(
      req.params.id,
      req.body
    );
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletar = async (req, res) => {
  try {
    await produtoService.deletarProduto(req.params.id);
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};