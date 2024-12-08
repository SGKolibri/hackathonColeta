import { FastifyInstance } from "fastify";
import { createPontoHandler, getPontosHandler } from "./rota.controller";

export async function pontoRoutes(server: FastifyInstance) {
  server.post("/", createPontoHandler);

  server.get("/", getPontosHandler);
}
