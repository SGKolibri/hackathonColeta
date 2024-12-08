import { FastifyInstance } from "fastify";
import { createAdminHandler, getAdminsHandler } from "./coleta.controller";

export async function adminRoutes(server: FastifyInstance) {
  server.post("/", createAdminHandler);

  server.get("/", getAdminsHandler);
}
