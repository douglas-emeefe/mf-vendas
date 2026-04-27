/*
  Warnings:

  - You are about to drop the column `categoria` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "categoria",
ADD COLUMN     "codigoBarras" TEXT,
ADD COLUMN     "grupoId" INTEGER;

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nome_key" ON "Grupo"("nome");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
