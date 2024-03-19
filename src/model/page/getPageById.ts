import { db } from "../../db/db";
import { PagesTable } from "../../db/schemas/page";
import { eq } from "drizzle-orm";

export const getPageById = async (id: number) => {
  try {
    const [result] = await db
      .select()
      .from(PagesTable)
      .where(eq(PagesTable.id, id));

    return result;
  } catch (error) {
    console.error("getPageById", error);
    return null;
  }
};
