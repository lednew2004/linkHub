import type { Prisma, User } from "../../generated/prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  updateUserName(userId: string, userName: string): Promise<User>;
  updateBiography(userId: string, biography: string): Promise<User>;
}
