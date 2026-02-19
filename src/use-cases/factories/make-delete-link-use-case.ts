import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { DeleteLinkUseCase } from "../delete-link";

export function makeDeleteLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const useCase = new DeleteLinkUseCase(linksRepository);

  return useCase;
}
