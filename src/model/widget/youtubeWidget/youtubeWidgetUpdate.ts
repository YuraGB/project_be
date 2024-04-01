import { YoutubeWidget } from "../../../db/schemas/youtubeWidget";
import { db } from "../../../db/db";
import { type TYoutubeWidget } from "../../../routes/customPagesController/customePageCreate/types";

export const youtubeWidgetUpdate = async (
  widget: TYoutubeWidget,
): Promise<{ id: number } | null> => {
  const widgetToSave = {
    ...widget,
    title: widget.title ?? widget.youtube_title,
  };

  try {
    const [youtubeWidget] = await db
      .insert(YoutubeWidget)
      .values(widgetToSave)
      .onConflictDoUpdate({
        target: YoutubeWidget.id,
        set: widgetToSave,
      })
      .returning({ id: YoutubeWidget.id });
    return youtubeWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TUpdateYoutubeWidget = typeof youtubeWidgetUpdate;
