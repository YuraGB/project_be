import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { PagesTable } from "../../db/schemas/page";

export type TRemovePageResponse = {
  id: number;
} | null;

export const removePage = async (id: number): Promise<TRemovePageResponse> => {
  try {
    const [deletedPageId] = await db
      .delete(PagesTable)
      .where(eq(PagesTable.id, id))
      .returning({
        id: PagesTable.id,
      });

    return deletedPageId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
