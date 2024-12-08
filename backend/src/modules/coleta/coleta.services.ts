import { connect } from "http2";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateColetaInput } from "./coleta.schemas";

export async function createColeta(input: CreateColetaInput) {
  const { tipo, ponto, pontoId } = input;

  const Coleta = await prisma.coleta.create({
    data: {
      tipo,
      ponto: {
        connect: { id: pontoId },
      },
    },
  });
}

export async function getColetas() {
  return prisma.coleta.findMany({
    select: {
      id: true,
      tipo: true,
      ponto: true,
    },
  });
}
