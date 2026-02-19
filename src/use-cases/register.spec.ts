import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";
import { UserAlreadyExistError } from "./error/user-already-exist-error";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "john doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      biography: "example",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to register with email duplicate", async () => {
    await sut.execute({
      name: "john doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      biography: "example",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "john doe",
        email: "johndoe@example.com",
        userName: "johndoe123",
        biography: "example",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });

  it("Should be able to hashing password", async () => {
    const { user } = await sut.execute({
      name: "john doe",
      email: "johndoe@example.com",
      userName: "johndoe123",
      biography: "example",
      password: "123456",
    });

    const doesPasswordHash = await compare("123456", user.password_hash);

    expect(doesPasswordHash).toBe(true);
  });
});
