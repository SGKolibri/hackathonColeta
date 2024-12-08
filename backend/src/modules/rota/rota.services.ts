import prisma from "../../utils/prisma";
import { CreateRotaInput } from "./rota.schemas";

export async function createRota(input: CreateRotaInput) {
  const { dia, addresses, horarios } = input;
  const ponto = await prisma.rotas.create({
    data: {
      dia,
      addresses: {
        create: addresses.map((address) => ({
          name: address.name,
        })),
      },
      horarios: {
        create: horarios.map((horario) => ({
          inicio: horario.inicio,
          fim: horario.fim,
          rotasId: horario.rotasId,
        })),
      },
    },
  });
}

export async function getRotas() {
  return prisma.rotas.findMany({
    select: {
      id: true,
      dia: true,
      addresses: true,
      horarios: true,
    },
  });
}
