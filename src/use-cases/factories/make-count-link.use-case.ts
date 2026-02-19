import { PrismaLinksRepository } from "../../repositories/prisma/prisma-links-repository";
import { CountLinkUseCase } from "../count-link";

export function makeCountLinkUseCase() {
  const linksRepository = new PrismaLinksRepository();
  const useCase = new CountLinkUseCase(linksRepository);

  return useCase;
}
