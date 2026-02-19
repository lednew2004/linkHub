import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { UpdateUserNameUseCase } from "./update-username-user";

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserNameUseCase;

describe("Update username use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserNameUseCase(usersRepository);
  });

  it("Should be able to get userId and update username", async () => {
    usersRepository.items.push({
      id: "user-01",
      name: "john doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      biography: "example",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: "user-01",
      userName: "johndoe456",
    });

    expect(user.biography).toEqual("example");
    expect(user.userName).toEqual("johndoe456");
  });
});
