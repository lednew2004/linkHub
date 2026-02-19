import { hash } from "bcryptjs";
import type { User } from "../../generated/prisma/client";
import type { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistError } from "./error/user-already-exist-error";

interface RegisterUseCaseRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
  biography: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private UsersRepository: UsersRepository) {}
  async execute({
    name,
    userName,
    email,
    password,
    biography,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const checkWithEmail = await this.UsersRepository.findByEmail(email);
    const password_hash = await hash(password, 6);

    if (checkWithEmail) {
      throw new UserAlreadyExistError();
    }

    const user = await this.UsersRepository.create({
      name,
      userName,
      email,
      password_hash,
      biography,
    });

    return {
      user,
    };
  }
}
