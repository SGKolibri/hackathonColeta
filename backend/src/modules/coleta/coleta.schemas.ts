import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { TiposColeta } from "@prisma/client";

const coletaCore = {
  tipo: z.nativeEnum(TiposColeta),
  ponto: z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  pontoId: z.string(),
};

const createColetaSchema = z.object({
  ...coletaCore,
});

export type CreateColetaInput = z.infer<typeof createColetaSchema>;

export const { schemas: coletaSchemas, $ref } = buildJsonSchemas(
  {
    createColetaSchema,
  },
  { $id: "ColetaSchema" }
);
