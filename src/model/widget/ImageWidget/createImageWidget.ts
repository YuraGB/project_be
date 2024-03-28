import { db } from "../../../db/db";
import { type TImageWidget } from "../../../routes/customPagesController/customePageCreate/types";
import { ImageWidget } from "../../../db/schemas/imageWidget";

export const createImageWidget = async (widgets: TImageWidget[]) => {
  try {
    const [imageWidget] = await db
      .insert(ImageWidget)
      .values(widgets)
      .returning();
    return imageWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TCreateLinkWidget = typeof createImageWidget;
