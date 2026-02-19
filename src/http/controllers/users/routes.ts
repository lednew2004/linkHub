import type { FastifyInstance } from "fastify";
import { Register } from "./register";
import { authentiate } from "./authenticate";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/register", Register);
  app.post("/sessions", authentiate);
}
