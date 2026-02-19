import type { Link } from "../../generated/prisma/client";
import type { LinksRepository } from "../repositories/links-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface DeleteLinkUseCaseRequest {
  linkId: string;
}

interface DeleteLinkUseCaseResponse {
  link: Link;
}

export class DeleteLinkUseCase {
  constructor(private LinksRepository: LinksRepository) {}
  async execute({
    linkId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.LinksRepository.deleteLink(linkId);
    if (!link) {
      throw new ResourceNotFoundError();
    }

    return {
      link,
    };
  }
}
