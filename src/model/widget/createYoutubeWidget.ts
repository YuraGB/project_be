import { YoutubeWidget } from "../../db/schemas/widget";
import { db } from "../../db/db";
import { type TYoutubeWidget } from "../../routes/customPagesController/customePageCreate/types";

export const createYoutubeWidget = async (widgets: TYoutubeWidget[]) => {
  try {
    const [youtubeWidget] = await db
      .insert(YoutubeWidget)
      .values(widgets)
      .returning();
    return youtubeWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};
