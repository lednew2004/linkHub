import type { FastifyInstance } from "fastify";
import { Register } from "./register";
import { authentiate } from "./authenticate";
import { refresh } from "./refresh";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", Register);
  app.post("/sessions", authentiate);
  app.patch("/token/refresh", refresh);
  app.get("/me", { onRequest: [verifyJWT, verifyUserRole("ADMIN")] }, profile);
}
