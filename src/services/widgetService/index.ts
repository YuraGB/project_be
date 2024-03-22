import {
  type TWidget,
  type TYoutubeWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";
import { createYoutubeWidget } from "../../model/widget/createYoutubeWidget";
import { getWidgetById } from "../../model/widget/getWidgetById";
import { type IWidgetService } from "./types";
import { type TYoutubeWidgetSchema } from "../../db/schemas/widget";

class WidgetService implements IWidgetService {
  public async getWidget(id: number, type: string): Promise<TWidget | null> {
    return await getWidgetById(id, type);
  }

  public async createWidget(widget: TWidget): Promise<Widget | null> {
    const { type } = widget;
    if (type === "youtube")
      return await this.createYoutubeWidget(widget as TYoutubeWidgetSchema);

    throw new Error("Invalid widget type");
  }

  private async createYoutubeWidget(
    widget: TYoutubeWidget | TYoutubeWidget[],
  ): Promise<TYoutubeWidgetSchema | null> {
    return await createYoutubeWidget(Array.isArray(widget) ? widget : [widget]);
  }

  public async updateWidget(_widget: TWidget): Promise<undefined> {}

  public async deleteWidget(_id: number): Promise<undefined> {}
}

export const widgetService = new WidgetService();
