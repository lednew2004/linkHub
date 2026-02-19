import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repositoy";
import { CreateLinkUseCase } from "../create-link";

export function makeCreateLinkUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const linksRepository = new PrismaLinksRepository();
  const useCase = new CreateLinkUseCase(linksRepository, usersRepository);

  return useCase;
}
