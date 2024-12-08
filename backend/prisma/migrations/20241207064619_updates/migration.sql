-- CreateEnum
CREATE TYPE "TiposColeta" AS ENUM ('PAPEL_PAPELAO', 'PLASTICO_ISOPOR', 'VIDRO', 'METAL', 'MADEIRA', 'PERIGOSO_CONTAMINADO', 'DESCARTE_SAUDE', 'RADIOATIVO', 'ORGANICO', 'NAO_RECICLAVEL');

-- CreateTable
CREATE TABLE "HorariosPonto" (
    "id" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "pontoId" TEXT NOT NULL,

    CONSTRAINT "HorariosPonto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coleta" (
    "id" TEXT NOT NULL,
    "tipo" "TiposColeta" NOT NULL,
    "pontoId" TEXT NOT NULL,

    CONSTRAINT "Coleta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HorariosPonto" ADD CONSTRAINT "HorariosPonto_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "PontoColeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coleta" ADD CONSTRAINT "Coleta_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "PontoColeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
