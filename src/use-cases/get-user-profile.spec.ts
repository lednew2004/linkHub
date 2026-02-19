import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    usersRepository.items.push({
      id: "user-01",
      name: "john doe",
      email: "johndoe@example",
      biography: "example",
      password_hash: await hash("123456", 6),
      role: "ADMIN",
      userName: "johndoe124",
    });

    const { user } = await sut.execute({
      userId: "user-01",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
