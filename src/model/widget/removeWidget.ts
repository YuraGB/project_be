import { db } from "../../db/db";
import { YoutubeWidget } from "../../db/schemas/widget";
import { eq } from "drizzle-orm";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeWidget = async (
  id: number,
): Promise<TRemoveWidgetResponse[] | null> => {
  try {
    return await db
      .delete(YoutubeWidget)
      .where(eq(YoutubeWidget.pageId, id))
      .returning({
        id: YoutubeWidget.id,
      });
  } catch (e) {
    console.log(e);
    return null;
  }
};
