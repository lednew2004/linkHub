import type { UserCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUserName(userName: string) {
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    return user;
  }

  async updateUserName(userId: string, userName: string) {
    const newUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userName,
      },
    });

    return newUser;
  }

  async updateBiography(userId: string, biography: string) {
    const newUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        biography,
      },
    });

    return newUser;
  }
}
