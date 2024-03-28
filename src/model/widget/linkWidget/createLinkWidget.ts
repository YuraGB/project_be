import { db } from "../../../db/db";
import { type TLinkWidget } from "../../../routes/customPagesController/customePageCreate/types";
import { LinkWidget } from "../../../db/schemas/linkWidget";

export const createLinkWidget = async (widgets: TLinkWidget[]) => {
  try {
    const [linkWidget] = await db
      .insert(LinkWidget)
      .values(widgets)
      .returning();
    return linkWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TCreateLinkWidget = typeof createLinkWidget;
