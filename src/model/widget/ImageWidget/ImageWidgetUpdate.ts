import { db } from "../../../db/db";
import { type TImageWidget } from "../../../routes/customPagesController/customePageCreate/types";
import { ImageWidget } from "../../../db/schemas/imageWidget";

export const imageWidgetUpdate = async (
  widget: TImageWidget,
): Promise<{ id: number } | null> => {
  const widgetToSave = {
    ...widget,
    title: widget.title ?? widget.image_title,
  };

  try {
    const [imageWidget] = await db
      .insert(ImageWidget)
      .values(widgetToSave)
      .onConflictDoUpdate({
        target: ImageWidget.id,
        set: widgetToSave,
      })
      .returning({ id: ImageWidget.id });
    return imageWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TUpdateImageWidget = typeof imageWidgetUpdate;
