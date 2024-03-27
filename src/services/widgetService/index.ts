import {
  type TWidget,
  type TYoutubeWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";
import { createYoutubeWidget } from "../../model/widget/createYoutubeWidget";
import { getWidgetById } from "../../model/widget/getWidgetById";
import { type IWidgetService } from "./types";
import { type TYoutubeWidgetSchema } from "../../db/schemas/youtubeWidget";
import { youtubeWidgetUpdate } from "../../model/widget/youtubeWidgetUpdate";
import { removeYoutubeWidgetById } from "../../model/widget/removeYoutubeWidgetById";

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
  public async createWidget(widget: TWidget): Promise<Widget | null> {
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
  ): Promise<TYoutubeWidgetSchema | null> {
    const widgetsToSave = Array.isArray(widget) ? widget : [widget];
    const youtubeWidgets = widgetsToSave.map(
      ({ youtube_title, title, ...rest }) => ({
        ...rest,
        youtube_title,
        title: title ?? youtube_title,
      }),
    );

    return await createYoutubeWidget(youtubeWidgets);
  }

  public async updateWidget(widget: TWidget): Promise<{ id: number } | null> {
    const { type } = widget;

    if (type === "youtube") {
      return await this.updateYoutubeWidget(widget as TYoutubeWidget);
    }

    throw new Error("Invalid widget type");
  }

  public async updateYoutubeWidget(
    widget: TYoutubeWidget,
  ): Promise<{ id: number } | null> {
    return await youtubeWidgetUpdate(widget);
  }

  /**
   * Delete widget
   * @param id
   */
  public async deleteWidget(id: number): Promise<{ id: number } | null> {
    // todo: add functionality to delete other types of widgets
    return await removeYoutubeWidgetById(id);
  }
}

export const widgetService = new WidgetService();
