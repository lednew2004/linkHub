import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { UpdateBiographyUseCase } from "./update-biography-user";

let usersRepository: InMemoryUsersRepository;
let sut: UpdateBiographyUseCase;

describe("Update Biography use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateBiographyUseCase(usersRepository);
  });

  it("Should be able to get userId and update biography", async () => {
    usersRepository.items.push({
      id: "user-01",
      name: "john doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      biography: "example",
      password_hash: await hash("123456", 6),
      role: "ADMIN",
    });

    const { user } = await sut.execute({
      userId: "user-01",
      biography: "example 2",
    });

    expect(user.userName).toEqual("johndoe123");
    expect(user.biography).toEqual("example 2");
  });
});
