import { db } from "../../db/db";
import { YoutubeWidget } from "../../db/schemas/widget";
import { eq } from "drizzle-orm";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeYoutubeWidgetById = async (
  id: number,
): Promise<TRemoveWidgetResponse | null> => {
  try {
    const [removedWidgetId] = await db
      .delete(YoutubeWidget)
      .where(eq(YoutubeWidget.id, id))
      .returning({
        id: YoutubeWidget.id,
      });
    return removedWidgetId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
