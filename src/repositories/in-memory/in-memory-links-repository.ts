import { randomUUID } from "node:crypto";
import type { LinkUncheckedCreateInput } from "../../../generated/prisma/models";
import type { LinksRepository } from "../links-repository";
import type { Link } from "../../../generated/prisma/client";

export class InMemoryLinksRepository implements LinksRepository {
  public items: Link[] = [];
  async create(data: LinkUncheckedCreateInput) {
    const link = {
      id: randomUUID(),
      url: data.url,
      title: data.title,
      status: true,
      order: data.order ?? this.items.length + 1,
      count: data.count ?? 0,
      userid: data.userid,
    };

    this.items.push(link);

    return link;
  }

  async findByLink(linkId: string): Promise<Link | null> {
    const link = this.items.find((item) => item.id === linkId);

    if (!link) {
      return null;
    }

    return link;
  }

  async findManyLinksUser(userId: string) {
    const links = this.items.filter((item) => item.userid === userId);

    return links;
  }

  async findByUrlandStatus(url: string) {
    const link = this.items.find(
      (item) => item.url === url && item.status === true,
    );
    if (!link) {
      return null;
    }

    return link;
  }

  async deleteLink(linkId: string) {
    const itemIndex = this.items.findIndex((item) => item.id === linkId);

    if (itemIndex < 0) {
      return null;
    }

    const [deletedLink] = this.items.splice(itemIndex, 1);

    return deletedLink ?? null;
  }

  async clickCountLink(linkId: string): Promise<Link> {
    const itemIndex = this.items.findIndex((item) => item.id === linkId);

    if (itemIndex < 0) {
      throw new Error("Link not found");
    }

    this.items[itemIndex]!.count += 1;

    return this.items[itemIndex]!;
  }
}
