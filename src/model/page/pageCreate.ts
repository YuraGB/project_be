import { PagesTable } from "../../db/schemas/page";
import { db } from "../../db/db";
import { type TPageData } from "../../services/customPageService/types";

export type TPageCreate = (
  data: TPageData["Body"],
) => Promise<{ pageId: number | null } | null>;

export const pageCreate: TPageCreate = async (data: TPageData["Body"]) => {
  const pageData = {
    title: data.page_title,
    userId: data.userId,
  };
  try {
    const [result] = await db
      .insert(PagesTable)
      .values(pageData)
      .returning({ pageId: PagesTable.id });

    return result;
  } catch (error) {
    console.error("pageCreate", error);
    return null;
  }
};
