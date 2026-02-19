import type { FastifyInstance } from "fastify";
import { createLink } from "./create-link";
import { findManyLinks } from "./find-many-links";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { deleteLink } from "./delete-link";
import { count } from "./count";

export async function linksRoutes(app: FastifyInstance) {
  app.post(
    "/create/link",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    createLink,
  );

  app.post("/link/:linkId/click", count);

  app.get("/links/:userName", findManyLinks);

  app.delete(
    "/link/:linkId",
    { onRequest: [verifyJWT, verifyUserRole("ADMIN")] },
    deleteLink,
  );
}
