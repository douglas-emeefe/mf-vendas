/*
  Warnings:

  - Added the required column `perfil` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "perfil" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Ativo';
