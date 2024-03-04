import { type User } from "../../../services/userService/types";
import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";

export const createUser = async (user: User): Promise<User | null> => {
  console.log(user);
  try {
    const [createdUser] = await db.insert(UsersTable).values(user).returning();
    return createdUser;
  } catch (error) {
    console.error("createUser", error);
    return null;
  }
};
