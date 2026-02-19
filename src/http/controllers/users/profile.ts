import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use-case";
import { ResourceNotFoundError } from "../../../use-cases/error/resource-not-found-error";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    });
    return reply.status(201).send({ user });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
