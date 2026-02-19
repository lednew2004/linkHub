import { randomUUID } from "node:crypto";
import { ROLE, type User } from "../../../generated/prisma/client";
import type { UserCreateInput } from "../../../generated/prisma/models";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      userName: data.userName,
      email: data.email,
      password_hash: data.password_hash,
      biography: data.biography,
      role: data.role ?? "ADMIN",
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUserName(userName: string) {
    const user = this.items.find((item) => item.userName === userName);

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUserName(userId: string, userName: string) {
    const index = this.items.findIndex((item) => item.id === userId);

    if (index < 0) throw new Error("User not found");

    const updatedUser = { ...this.items[index], userName } as User;

    this.items[index] = updatedUser;
    return updatedUser;
  }

  async updateBiography(userId: string, biography: string) {
    const index = this.items.findIndex((item) => item.id === userId);

    if (index < 0) throw new Error("User not found");

    const updatedUser = { ...this.items[index], biography } as User;

    this.items[index] = updatedUser;
    return updatedUser;
  }
}
