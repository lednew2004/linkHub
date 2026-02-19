import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/error/resource-not-found-error";
import { makeCountLinkUseCase } from "../../../use-cases/factories/make-count-link.use-case";

export async function count(request: FastifyRequest, reply: FastifyReply) {
  const createLinkBodySchema = z.object({
    linkId: z.string(),
  });

  const { linkId } = createLinkBodySchema.parse(request.params);

  try {
    const countLinkUseCase = makeCountLinkUseCase();

    await countLinkUseCase.execute({
      linkId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send();
}
