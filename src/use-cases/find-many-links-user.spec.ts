import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InMemoryLinksRepository } from "../repositories/in-memory/in-memory-links-repository";
import { FindManyLinksUserUseCase } from "./find-many-links-user";

let usersRepository: InMemoryUsersRepository;
let linksRepository: InMemoryLinksRepository;
let sut: FindManyLinksUserUseCase;

describe("Find many links user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    linksRepository = new InMemoryLinksRepository();
    sut = new FindManyLinksUserUseCase(linksRepository, usersRepository);
  });

  it("Should be able to get links", async () => {
    const { id } = await usersRepository.create({
      name: "john doe",
      email: "johndoe@example",
      userName: "johndoe123",
      password_hash: await hash("123456", 6),
      biography: "example",
    });

    await linksRepository.create({
      title: "instagram",
      url: "exampleInsta",
      userid: id,
    });

    await linksRepository.create({
      title: "whatsapp",
      url: "exampleWhats",
      userid: id,
    });

    const { links } = await sut.execute({
      userName: "johndoe123",
    });

    expect(links).toEqual([
      expect.objectContaining({
        title: "instagram",
      }),
      expect.objectContaining({
        title: "whatsapp",
      }),
    ]);
  });
});
