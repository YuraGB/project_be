import { YoutubeWidget } from "../../db/schemas/widget";
import { db } from "../../db/db";
import { type TYoutubeWidget } from "../../routes/customPagesController/customePageCreate/types";

export const youtubeWidgetUpdate = async (
  widget: TYoutubeWidget,
): Promise<{ id: number } | null> => {
  try {
    const [youtubeWidget] = await db
      .insert(YoutubeWidget)
      .values(widget)
      .onConflictDoUpdate({
        target: YoutubeWidget.id,
        set: widget,
      })
      .returning({ id: YoutubeWidget.id });
    return youtubeWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TUpdateYoutubeWidget = typeof youtubeWidgetUpdate;
