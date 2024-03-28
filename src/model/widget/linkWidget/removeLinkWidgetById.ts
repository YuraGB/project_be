import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { LinkWidget } from "../../../db/schemas/linkWidget";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeLinkWidgetById = async (
  id: number,
): Promise<TRemoveWidgetResponse | null> => {
  try {
    const [removedWidgetId] = await db
      .delete(LinkWidget)
      .where(eq(LinkWidget.id, id))
      .returning({
        id: LinkWidget.id,
      });
    return removedWidgetId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
