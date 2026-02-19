import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repositoy";
import { FindManyLinksUserUseCase } from "../find-many-links-user";

export function makeFindManyLinksUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const linksRepository = new PrismaLinksRepository();
  const useCase = new FindManyLinksUserUseCase(
    linksRepository,
    usersRepository,
  );

  return useCase;
}
