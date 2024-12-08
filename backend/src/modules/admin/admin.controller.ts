import { FastifyReply, FastifyRequest } from "fastify";
import { createAdmin, findAdminByEmail, getAdmins } from "./admin.services";
import { CreateAdminInput, LoginAdminInput } from "./admin.schemas";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export async function createAdminHandler(
  request: FastifyRequest<{ Body: CreateAdminInput }>,
  reply: FastifyReply
) {
  const body = request.body; // email, password, name
  try {
    const admin = await createAdmin(body);
    return reply.status(201).send(admin);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getAdminsHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const admins = await getAdmins();
    return reply.send(admins);
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function loginAdminHandler(
  request: FastifyRequest<{ Body: LoginAdminInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const admin = await findAdminByEmail(body.email);

    if (!admin)
      return reply.code(401).send({ message: "Invalid email or password" });

    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: admin.salt,
      hash: admin.password,
    });

    if (correctPassword) {
      const { password, salt, ...rest } = admin; // remove password and salt from the response
      const accessToken = server.jwt.sign(rest, { expiresIn: "1h" }); // sign the rest of the object
      return reply.send({ accessToken, data: rest });
    }

    return reply.code(401).send({ message: "Invalid email or password" });
  } catch (e) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
