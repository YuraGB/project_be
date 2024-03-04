import type { User } from "../../../services/userService/types";
import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [user] = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));

    return user;
  } catch (error) {
    console.error("findUserByEmail", error);
    return null;
  }
};
