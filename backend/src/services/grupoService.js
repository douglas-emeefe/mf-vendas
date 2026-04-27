import prisma from "../database/prismaClient.js";

export const criarGrupo = async (data) => {
    return await prisma.grupo.create({
        data,
    });
};

export const listarGrupos = async () => {
    return await prisma.grupo.findMany({
        orderBy: {
            nome: "asc",
        },
    });
};

export const deletarGrupo = async (id) => {
    return await prisma.grupo.delete({
        where: {
            id: Number(id),
        },
    });
};