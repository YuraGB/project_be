import { type UsersTable } from "../../db/schemas/user";
import { type InferSelectModel } from "drizzle-orm";
import { type ICreateUser } from "../../routes/userController/createUser/types";
import { type TDeleteUser } from "../../model/user/deleteUser";

export type User = InferSelectModel<typeof UsersTable>;

export interface IUserService {
  createUser: (user: ICreateUser) => Promise<User | null>;
  getUserById: (id: number) => Promise<User | null>;
  getUserByEmail: (email: string) => Promise<User | null>;
  updateUser: (user: User) => Promise<User | null>;
  deleteUser: (id: number) => TDeleteUser;
  getUsers: () => Promise<User[] | null>;
}
