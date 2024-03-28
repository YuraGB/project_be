import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { ImageWidget } from "../../../db/schemas/imageWidget";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeImageWidgetByPageId = async (
  id: number,
): Promise<TRemoveWidgetResponse | null> => {
  try {
    const [removedWidgetId] = await db
      .delete(ImageWidget)
      .where(eq(ImageWidget.pageId, id))
      .returning({
        id: ImageWidget.id,
      });
    return removedWidgetId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
