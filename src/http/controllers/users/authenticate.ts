import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "../../../use-cases/error/invalid-credentials-error";

export async function authentiate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authentiateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authentiateBodySchema.parse(request.body);

  try {
    const authentiateUseCase = makeAuthenticateUseCase();

    const { user } = await authentiateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },

      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
