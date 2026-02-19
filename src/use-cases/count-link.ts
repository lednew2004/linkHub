import type { Link } from "../../generated/prisma/client";
import type { LinksRepository } from "../repositories/links-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface CountLinkUseCaseRequest {
  linkId: string;
}

interface CountLinkUseCaseResponse {
  link: Link;
}

export class CountLinkUseCase {
  constructor(private LinksRepository: LinksRepository) {}
  async execute({
    linkId,
  }: CountLinkUseCaseRequest): Promise<CountLinkUseCaseResponse> {
    const link = await this.LinksRepository.clickCountLink(linkId);

    if (!link) {
      throw new ResourceNotFoundError();
    }

    return {
      link,
    };
  }
}
