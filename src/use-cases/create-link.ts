import type { Link } from "../../generated/prisma/client";
import type { LinksRepository } from "../repositories/links-repository";
import type { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { UrlAlreadyUse } from "./error/url-already-use";

interface CreateLinkUseCaseRequest {
  url: string;
  title: string;
  userid: string;
}

interface CreateLinkUseCaseResponse {
  link: Link;
}

export class CreateLinkUseCase {
  constructor(
    private LinksRepository: LinksRepository,
    private UsersRepository: UsersRepository,
  ) {}
  async execute({
    title,
    url,
    userid,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const user = await this.UsersRepository.findById(userid);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const withLink = await this.LinksRepository.findByUrlandStatus(url);
    if (withLink) {
      throw new UrlAlreadyUse();
    }

    const link = await this.LinksRepository.create({
      title,
      url,
      userid: user.id,
    });

    return {
      link,
    };
  }
}
