import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { withRefResolver } from "fastify-zod";
import fastifyCors from "@fastify/cors";
import userRoutes from "./modules/user/user.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { userSchemas } from "./modules/user/user.schema";
import { adminSchemas } from "./modules/admin/admin.schemas";
import { version } from "../package.json";
import { pontoRoutes } from "./modules/ponto/ponto.routes";
import { pontoSchemas } from "./modules/ponto/ponto.schemas";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fastifyCors, {
  origin: "*",
});

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

server.register(fastifyJwt, {
  secret: jwtSecret,
});

server.decorate(
  "authenticate", // name of the decorator
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get("/", async () => {
  return { healthcheck: "OK" };
});

async function main() {
  for (const schema of [...userSchemas, ...adminSchemas, ...pontoSchemas]) {
    server.addSchema(schema);
  }

  await server.register(require("@fastify/swagger"));
  await server.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });

  server.register(userRoutes, { prefix: "api/users" });
  server.register(adminRoutes, { prefix: "api/admins" });
  server.register(pontoRoutes, { prefix: "api/pontos" });

  try {
    await server.listen({ port: 5050, host: "0.0.0.0" });
    console.log("Server started on http://localhost:5050");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
