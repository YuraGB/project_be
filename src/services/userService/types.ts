import { type UsersTable } from "../../db/schemas/user";
import { type InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof UsersTable>;

export interface IUserService {
  createUser: (user: User) => Promise<User | null>;
  getUserById: (id: number) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
  updateUser: (user: User) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  getUsers: () => Promise<User[] | null>;
}
