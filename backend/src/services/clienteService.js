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

export const deletarCliente = async (id) => {
    return await prisma.cliente.delete({
        where: {
            id: Number(id),
        },
    });
};