import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryLinksRepository } from "../repositories/in-memory/in-memory-links-repository";
import { DeleteLinkUseCase } from "./delete-link";

let linksRepository: InMemoryLinksRepository;
let sut: DeleteLinkUseCase;

describe("delete links use case", () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository();
    sut = new DeleteLinkUseCase(linksRepository);
  });

  it("Should be able to delete link", async () => {
    linksRepository.items.push({
      id: "link-01",
      title: "spotify",
      url: "example.com",
      status: true,
      count: 0,
      order: 1,
      userid: "user-01",
    });

    linksRepository.items.push({
      id: "link-02",
      title: "spotify",
      url: "example.com",
      status: true,
      count: 0,
      order: 2,
      userid: "user-01",
    });

    const { link } = await sut.execute({
      linkId: "link-01",
    });

    expect(link.id).toEqual(expect.any(String));
    expect(linksRepository.items).toEqual([
      expect.objectContaining({
        id: "link-02",
      }),
    ]);
  });
});
