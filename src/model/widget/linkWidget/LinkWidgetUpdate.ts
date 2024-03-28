import { db } from "../../../db/db";
import { type TLinkWidget } from "../../../routes/customPagesController/customePageCreate/types";
import { LinkWidget } from "../../../db/schemas/linkWidget";

export const linkWidgetUpdate = async (
  widget: TLinkWidget,
): Promise<{ id: number } | null> => {
  const widgetToSave = {
    ...widget,
    title: widget.title ?? widget.link_title,
  };

  try {
    const [linkWidget] = await db
      .insert(LinkWidget)
      .values(widgetToSave)
      .onConflictDoUpdate({
        target: LinkWidget.id,
        set: widgetToSave,
      })
      .returning({ id: LinkWidget.id });
    return linkWidget;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export type TUpdateLinkWidget = typeof linkWidgetUpdate;
