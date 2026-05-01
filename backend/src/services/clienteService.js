import prisma from "../database/prismaClient.js";

export const criarCliente = async (data) => {
    return await prisma.cliente.create({
        data,
    });
};

export const listarClientes = async () => {
    return await prisma.cliente.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

export const atualizarCliente = async (id, data) => {
    return await prisma.cliente.update({
        where: { id: Number(id) },
        data: {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            cpf: data.cpf,
        },
    });
};

export const deletarCliente = async (id) => {
    return await prisma.cliente.delete({
        where: {
            id: Number(id),
        },
    });
};