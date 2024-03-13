import { type User } from "../../../services/userService/types";
import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";
import { type ICreateUser } from "../../../routes/userController/createUser/types";

export const createUser = async (user: ICreateUser): Promise<User | null> => {
  try {
    const [createdUser] = await db.insert(UsersTable).values(user).returning();
    return createdUser;
  } catch (error) {
    console.error("createUser", error);
    return null;
  }
};
