import type { Link } from "../../../generated/prisma/client";
import type { LinkUncheckedCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import type { LinksRepository } from "../links-repository";

export class PrismaLinksRepository implements LinksRepository {
  async create(data: LinkUncheckedCreateInput) {
    const link = await prisma.link.create({
      data,
    });

    return link;
  }

  async findByLink(linkId: string) {
    const link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });

    return link;
  }

  async findManyLinksUser(userid: string) {
    const links = await prisma.link.findMany({
      where: {
        userid,
      },
    });

    return links;
  }

  async findByUrlandStatus(url: string) {
    const link = await prisma.link.findUnique({
      where: {
        url,
        status: true,
      },
    });

    return link;
  }

  async deleteLink(linkId: string) {
    const link = await prisma.link.delete({
      where: {
        id: linkId,
      },
    });

    return link;
  }

  async clickCountLink(linkId: string) {
    const link = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        count: +1,
      },
    });

    return link;
  }
}

// lyzrkrZVlDTrbRPB
// postgresql://docker:docker@localhost:2020/apiLinkHub?schema=public
