import { db } from "../../db/db";
import { YoutubeWidget } from "../../db/schemas/youtubeWidget";
import { eq } from "drizzle-orm";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeWidget = async (
  id: number,
): Promise<TRemoveWidgetResponse | null> => {
  try {
    const [removedWidgetId] = await db
      .delete(YoutubeWidget)
      .where(eq(YoutubeWidget.pageId, id))
      .returning({
        id: YoutubeWidget.id,
      });
    return removedWidgetId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
