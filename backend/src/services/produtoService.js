import prisma from "../database/prismaClient.js";

export const criarProduto = async (data) => {
  return await prisma.produto.create({
    data: {
      nome: data.nome,
      codigoBarras: data.codigoBarras,
      preco: Number(data.preco),
      custo: Number(data.custo),
      estoque: Number(data.estoque),
      grupoId: data.grupoId ? Number(data.grupoId) : null
    }
  });
};

export const listarProdutos = async () => {
  return await prisma.produto.findMany({
    include: {
      grupo: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const buscarProdutoPorId = async (id) => {
  return await prisma.produto.findUnique({
    where: { id: Number(id) }
  });
};

export const atualizarProduto = async (id, data) => {
  return await prisma.produto.update({
    where: { id: Number(id) },
    data
  });
};

export const deletarProduto = async (id) => {
  return await prisma.produto.delete({
    where: { id: Number(id) }
  });
};