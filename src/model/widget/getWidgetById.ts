import { type TWidget } from "../../routes/customPagesController/customePageCreate/types";
import { db } from "../../db/db";
import { YoutubeWidget } from "../../db/schemas/youtubeWidget";
import { eq } from "drizzle-orm";

export const getWidgetById = async (
  id: number,
  type: string,
): Promise<TWidget | null> => {
  try {
    if (type === "youtube") {
      const [widget] = await db
        .select()
        .from(YoutubeWidget)
        .where(eq(YoutubeWidget.id, id));
      return widget;
    }

    console.log("Invalid widget type");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
