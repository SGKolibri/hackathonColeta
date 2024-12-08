import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const pontoCore = {
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),
  latitude: z.number({
    required_error: "Latitude is required",
    invalid_type_error: "Latitude must be a number",
  }),
  longitude: z.number({
    required_error: "Longitude is required",
    invalid_type_error: "Longitude must be a number",
  }),
};

const createPontoSchema = z.object({
  ...pontoCore,
});

export type CreatePontoInput = z.infer<typeof createPontoSchema>;

export const { schemas: pontoSchemas, $ref } = buildJsonSchemas(
  {
    createPontoSchema,
  },
  { $id: "PontoSchema" }
);
