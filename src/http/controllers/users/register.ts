import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserAlreadyExistError } from "../../../use-cases/error/user-already-exist-error";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    userName: z.string(),
    biography: z.string(),
  });

  const { biography, email, name, password, userName } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      userName,
      email,
      biography,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
