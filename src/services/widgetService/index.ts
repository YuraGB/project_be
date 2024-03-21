import {
  type TWidget,
  type TYoutubeWidget,
} from "../../routes/customPagesController/customePageCreate/types";
import { createYoutubeWidget } from "../../model/widget/createYoutubeWidget";
import { getWidgetById } from "../../model/widget/getWidgetById";
import { type IWidgetService } from "./types";

class WidgetService implements IWidgetService {
  /**
   * Get widget by id
   * @param id
   * @param type
   */
  public async getWidget(id: number, type: string): Promise<TWidget | null> {
    return await getWidgetById(id, type);
  }

  /**
   *  Create widget
   * @param widget
   */
  public async createWidget(widget: TWidget): Promise<TWidget | null> {
    const { type } = widget;
    if (type === "youtube")
      return await this.createYoutubeWidget(widget as TYoutubeWidget);

    throw new Error("Invalid widget type");
  }

  /**
   * Create youtube widget
   * @param widget
   * @private
   */
  private async createYoutubeWidget(
    widget: TYoutubeWidget | TYoutubeWidget[],
  ): Promise<TWidget | null> {
    return await createYoutubeWidget(Array.isArray(widget) ? widget : [widget]);
  }

  /**
   * Update widget
   * @param _widget
   */
  public async updateWidget(_widget: TWidget): Promise<undefined> {}

  /**
   * Delete widget
   * @param _id
   */
  public async deleteWidget(_id: number): Promise<undefined> {}
}

export const widgetService = new WidgetService();
