import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";
import { eq } from "drizzle-orm";
import { type TRequestUpdateUser } from "../../../routes/userController/updateUser/types";
import { type User } from "../../../services/userService/types";

export const userUpdate = async (
  user: TRequestUpdateUser,
): Promise<User | null> => {
  try {
    const [updatedUser] = await db
      .update(UsersTable)
      .set(user)
      .where(eq(UsersTable.id, user.id))
      .returning();

    return updatedUser;
  } catch (error) {
    console.error("updateUser", error);
    return null;
  }
};
