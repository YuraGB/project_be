import { type TRequestUpdatePage } from "../../routes/customPagesController/customePageUpdate/types";
import { db } from "../../db/db";
import { PagesTable } from "../../db/schemas/page";
import { eq } from "drizzle-orm";

export const updatePage = async (
  body: TRequestUpdatePage["Body"],
): Promise<{ id: number } | null> => {
  try {
    const pageData = {
      title: body.page_title,
      userId: body.userId,
    };
    const [response] = await db
      .update(PagesTable)
      .set(pageData)
      .where(eq(PagesTable.id, body.id))
      .returning({ id: PagesTable.id });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
