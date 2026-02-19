import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repositoy";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}
