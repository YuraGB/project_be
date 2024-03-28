import { db } from "../../../db/db";
import { eq } from "drizzle-orm";
import { ImageWidget } from "../../../db/schemas/imageWidget";

interface TRemoveWidgetResponse {
  id: number;
}
export const removeImageWidgetById = async (
  id: number,
): Promise<TRemoveWidgetResponse | null> => {
  try {
    const [removedWidgetId] = await db
      .delete(ImageWidget)
      .where(eq(ImageWidget.id, id))
      .returning({
        id: ImageWidget.id,
      });
    return removedWidgetId;
  } catch (e) {
    console.log(e);
    return null;
  }
};
