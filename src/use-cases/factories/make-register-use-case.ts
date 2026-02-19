import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repositoy";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}
