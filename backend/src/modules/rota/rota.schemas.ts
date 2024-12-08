import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const rotaCore = {
  dia: z.string(),
  addresses: z.array(z.object({ name: z.string(), address: z.string() })),
  horarios: z.array(
    z.object({ inicio: z.date(), fim: z.date(), rotasId: z.string() })
  ),
};

const createRotaSchema = z.object({
  ...rotaCore,
});

export type CreateRotaInput = z.infer<typeof createRotaSchema>;

export const { schemas: rotaSchemas, $ref } = buildJsonSchemas(
  {
    createRotaSchema,
  },
  { $id: "RotaSchema" }
);
