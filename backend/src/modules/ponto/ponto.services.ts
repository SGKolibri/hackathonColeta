import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreatePontoInput } from "./ponto.schemas";

export async function createPonto(input: CreatePontoInput) {
  const { ...rest } = input;
  const ponto = await prisma.pontoColeta.create({
    data: {
      ...rest,
    },
  });
}

export async function getPontos() {
  return prisma.pontoColeta.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      description: true,
      latitude: true,
      longitude: true,
    },
  });
}
