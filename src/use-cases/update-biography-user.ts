import type { User } from "../../generated/prisma/client";
import type { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface UpdateBiographyUseCaseRequest {
  userId: string;
  biography: string;
}

interface UpdateBiographyUseCaseResponse {
  user: User;
}

export class UpdateBiographyUseCase {
  constructor(private UsersRepository: UsersRepository) {}
  async execute({
    userId,
    biography,
  }: UpdateBiographyUseCaseRequest): Promise<UpdateBiographyUseCaseResponse> {
    const checkWithUserId = await this.UsersRepository.findById(userId);

    if (!checkWithUserId) {
      throw new ResourceNotFoundError();
    }

    const user = await this.UsersRepository.updateBiography(userId, biography);

    return {
      user,
    };
  }
}
