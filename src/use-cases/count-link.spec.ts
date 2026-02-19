import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryLinksRepository } from "../repositories/in-memory/in-memory-links-repository";
import { CountLinkUseCase } from "./count-link";

let linksRepository: InMemoryLinksRepository;
let sut: CountLinkUseCase;

describe("count link links use case", () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository();
    sut = new CountLinkUseCase(linksRepository);
  });

  it("Should be able to clicked and count link", async () => {
    linksRepository.items.push({
      id: "link-01",
      title: "spotify",
      url: "example.com",
      status: true,
      count: 0,
      order: 1,
      userid: "user-01",
    });

    await sut.execute({
      linkId: "link-01",
    });

    const { link } = await sut.execute({
      linkId: "link-01",
    });

    expect(link.count).toEqual(2);
  });
});
