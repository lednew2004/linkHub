import type { FastifyInstance } from "fastify";
import { createLink } from "./create-link";
import { findManyLinks } from "./find-many-links";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function linksRoutes(app: FastifyInstance) {
  app.post(
    "/create/link",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    createLink,
  );
  app.get("/links/:userName", findManyLinks);
}
