import type { User } from "../../generated/prisma/client";
import type { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

interface UpdateUserNameUseCaseRequest {
  userId: string;
  userName: string;
}

interface UpdateUserNameUseCaseResponse {
  user: User;
}

export class UpdateUserNameUseCase {
  constructor(private UsersRepository: UsersRepository) {}
  async execute({
    userId,
    userName,
  }: UpdateUserNameUseCaseRequest): Promise<UpdateUserNameUseCaseResponse> {
    const checkWithUserId = await this.UsersRepository.findById(userId);

    if (!checkWithUserId) {
      throw new ResourceNotFoundError();
    }

    const user = await this.UsersRepository.updateUserName(userId, userName);

    return {
      user,
    };
  }
}
