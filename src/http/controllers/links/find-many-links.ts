import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/error/resource-not-found-error";
import { makeFindManyLinksUsersUseCase } from "../../../use-cases/factories/make-find-many-links-user-use-case";

export async function findManyLinks(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findManyLinksBodySchema = z.object({
    userName: z.string(),
  });

  const { userName } = findManyLinksBodySchema.parse(request.params);
  console.log(userName);

  try {
    const findManyLinksUseCase = makeFindManyLinksUsersUseCase();

    const { links } = await findManyLinksUseCase.execute({
      userName,
    });
    return reply.status(200).send({ links });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
