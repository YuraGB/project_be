import { YoutubeWidget } from "../../db/schemas/widget";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";

export type TGetWidgetsByPageId = Array<{
  id: number;
  youtube_id: string;
  type: string;
  youtube_title: string;
}>;

export const getWidgetsByPageId = async (
  pageId: number,
): Promise<TGetWidgetsByPageId | null> => {
  try {
    return await db
      .select({
        id: YoutubeWidget.id,
        youtube_id: YoutubeWidget.youtube_id,
        type: YoutubeWidget.type,
        youtube_title: YoutubeWidget.youtube_title,
      })
      .from(YoutubeWidget)
      .where(eq(YoutubeWidget.pageId, pageId));
  } catch (error) {
    console.error("getWidgetsByPageId", error);
    return null;
  }
};
