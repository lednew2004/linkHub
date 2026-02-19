import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InMemoryLinksRepository } from "../repositories/in-memory/in-memory-links-repository";
import { CreateLinkUseCase } from "./create-link";

let usersRepository: InMemoryUsersRepository;
let linksRepository: InMemoryLinksRepository;
let sut: CreateLinkUseCase;

describe("Create links use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    linksRepository = new InMemoryLinksRepository();
    sut = new CreateLinkUseCase(linksRepository, usersRepository);
  });

  it("Should be able to create link", async () => {
    const { id } = await usersRepository.create({
      name: "john doe",
      email: "johndoe@example",
      userName: "johndoe123",
      password_hash: await hash("123456", 6),
      biography: "example",
    });

    const { link } = await sut.execute({
      title: "instagram",
      url: "examleUrl",
      userid: id,
    });

    expect(link.id).toEqual(expect.any(String));
  });
});
