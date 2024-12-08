import { FastifyReply, FastifyRequest } from "fastify";
import { createColeta, getColetas } from "./coleta.services";
import { CreateColetaInput } from "./coleta.schemas";

export async function createColetaHandler(
  request: FastifyRequest<{ Body: CreateColetaInput }>,
  reply: FastifyReply
) {
  const body = request.body; // tipo, ponto, pontoId
  try {
    const coleta = await createColeta(body);
    return reply.status(201).send(coleta);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getColetasHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const coletas = await getColetas();
    return reply.send(coletas);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
