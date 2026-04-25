import prisma from "../database/prismaClient.js";

export const criarUsuario = async (data) => {
    return await prisma.usuario.create({ data });
};

export const listarUsuarios = async () => {
    return await prisma.usuario.findMany({
        orderBy: { id: "desc" },
        select: {
            id: true,
            nome: true,
            email: true,
            perfil: true,
            status: true,
        },
    });
};

export const deletarUsuario = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) },
    });
};