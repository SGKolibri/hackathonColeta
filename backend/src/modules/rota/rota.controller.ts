import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePontoInput } from "../ponto/ponto.schemas";
import { createPonto, getPontos } from "./rota.services";

export async function createPontoHandler(
  request: FastifyRequest<{ Body: CreatePontoInput }>,
  reply: FastifyReply
) {
  const body = request.body; // name, address, description, latitude, longitude
  try {
    const ponto = await createPonto(body);
    return reply.status(201).send(ponto);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getPontosHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const pontos = await getPontos();
    return reply.send(pontos);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
