import type { Link } from "../../generated/prisma/client";
import type { LinksRepository } from "../repositories/links-repository";
import type { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface FindManyLinksUserUseCaseRequest {
  userName: string;
}

interface FindManyLinksUserUseCaseResponse {
  links: Link[];
}

export class FindManyLinksUserUseCase {
  constructor(
    private LinksRepository: LinksRepository,
    private UsersRepository: UsersRepository,
  ) {}
  async execute({
    userName,
  }: FindManyLinksUserUseCaseRequest): Promise<FindManyLinksUserUseCaseResponse> {
    const user = await this.UsersRepository.findByUserName(userName);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const links = await this.LinksRepository.findManyLinksUser(user.id);

    return {
      links,
    };
  }
}
