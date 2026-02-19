import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateLinkUseCase } from "../../../use-cases/factories/make-create-link-use-case";
import { ResourceNotFoundError } from "../../../use-cases/error/resource-not-found-error";
import { UrlAlreadyUse } from "../../../use-cases/error/url-already-use";

export async function createLink(request: FastifyRequest, reply: FastifyReply) {
  const createLinkBodySchema = z.object({
    title: z.string(),
    url: z.url(),
  });

  const { title, url } = createLinkBodySchema.parse(request.body);
  console.log(title, url);

  try {
    const createLinkUseCase = makeCreateLinkUseCase();

    await createLinkUseCase.execute({
      title,
      url,
      userid: request.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError || err instanceof UrlAlreadyUse) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
