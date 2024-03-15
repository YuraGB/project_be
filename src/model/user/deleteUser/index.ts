import { db } from "../../../db/db";
import { UsersTable } from "../../../db/schemas/user";
import { eq } from "drizzle-orm";

export type TDeleteUser = Promise<{ id: number } | null>;

export const userDelete = async (
  id: number,
): Promise<{ id: number } | null> => {
  try {
    const [deletedId] = await db
      .delete(UsersTable)
      .where(eq(UsersTable.id, id))
      .returning({ id: UsersTable.id });
    return deletedId;
  } catch (error) {
    console.error("deleteUser", error);
    return null;
  }
};
