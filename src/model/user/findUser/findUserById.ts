import type { User } from "../../../services/userService/types";
import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";
import { eq } from "drizzle-orm";

export const findUserById = async (id: number): Promise<User | null> => {
  try {
    const [user] = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, id));

    return user;
  } catch (error) {
    console.error("findUserById", error);
    return null;
  }
};
