import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const adminCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be at least 6 characters",
  }),
  name: z.string(),
};

const createAdminSchema = z.object({
  ...adminCore,
});

const loginAdminSchema = z.object({
  email: adminCore.email,
  password: adminCore.password,
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type LoginAdminInput = z.infer<typeof loginAdminSchema>;

export const { schemas: adminSchemas, $ref } = buildJsonSchemas(
  {
    createAdminSchema,
    loginAdminSchema,
  },
  { $id: "AdminSchema" }
);
