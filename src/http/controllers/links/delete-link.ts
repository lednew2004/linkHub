import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../use-cases/error/resource-not-found-error";
import { makeDeleteLinkUseCase } from "../../../use-cases/factories/make-delete-link-use-case";

export async function deleteLink(request: FastifyRequest, reply: FastifyReply) {
  const createLinkBodySchema = z.object({
    linkId: z.string(),
  });

  const { linkId } = createLinkBodySchema.parse(request.params);

  try {
    const createLinkUseCase = makeDeleteLinkUseCase();

    await createLinkUseCase.execute({
      linkId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(202).send();
}
