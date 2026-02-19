import type { Link } from "../../generated/prisma/client";
import type { LinkUncheckedCreateInput } from "../../generated/prisma/models";

export interface LinksRepository {
  create(data: LinkUncheckedCreateInput): Promise<Link>;
  findByLink(linkId: string): Promise<Link | null>;
  findManyLinksUser(userId: string): Promise<Link[]>;
  findByUrlandStatus(url: string): Promise<Link | null>;
}
