import type { User } from "../../../services/userService/types";
import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";

export const findUsers = async (): Promise<User[] | null> => {
  try {
    return await db.select().from(UsersTable);
  } catch (error) {
    console.error("findUserById", error);
    return null;
  }
};
