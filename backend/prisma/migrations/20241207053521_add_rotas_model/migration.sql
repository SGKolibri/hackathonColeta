-- CreateTable
CREATE TABLE "Rotas" (
    "id" TEXT NOT NULL,
    "dia" TEXT NOT NULL,

    CONSTRAINT "Rotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horarios" (
    "id" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "rotasId" TEXT NOT NULL,

    CONSTRAINT "Horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rotasId" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Horarios" ADD CONSTRAINT "Horarios_rotasId_fkey" FOREIGN KEY ("rotasId") REFERENCES "Rotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_rotasId_fkey" FOREIGN KEY ("rotasId") REFERENCES "Rotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
