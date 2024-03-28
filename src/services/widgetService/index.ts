import {
  type TImageWidget,
  type TLinkWidget,
  type TWidget,
  type TYoutubeWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";
import { createYoutubeWidget } from "../../model/widget/youtubeWidget/createYoutubeWidget";
import { getWidgetById } from "../../model/widget/getWidgetById";
import { type IWidgetService } from "./types";
import { type TYoutubeWidgetSchema } from "../../db/schemas/youtubeWidget";
import { youtubeWidgetUpdate } from "../../model/widget/youtubeWidget/youtubeWidgetUpdate";
import { removeYoutubeWidgetById } from "../../model/widget/youtubeWidget/removeYoutubeWidgetById";
import { linkWidgetUpdate } from "../../model/widget/linkWidget/LinkWidgetUpdate";
import { imageWidgetUpdate } from "../../model/widget/ImageWidget/ImageWidgetUpdate";
import { createLinkWidget } from "../../model/widget/linkWidget/createLinkWidget";
import { createImageWidget } from "../../model/widget/ImageWidget/createImageWidget";
import { removeLinkWidgetById } from "../../model/widget/linkWidget/removeLinkWidgetById";
import { removeImageWidgetById } from "../../model/widget/ImageWidget/removeImageWidgetById";

/**
 * Widget service
 */
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

    if (type === "link")
      return await this.createLinkWidget(widget as TLinkWidget);

    if (type === "image")
      return await this.createImageWidget(widget as TImageWidget);

    throw new Error("Invalid widget type");
  }

  /**
   * Create image widget
   * @param widget
   * @private
   */
  private async createImageWidget(
    widget: TImageWidget,
  ): Promise<TImageWidget | null> {
    return await createImageWidget([widget]);
  }

  /**
   * Create link widget
   * @param widget
   * @private
   */
  private async createLinkWidget(
    widget: TLinkWidget,
  ): Promise<TLinkWidget | null> {
    return await createLinkWidget([widget]);
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

  /**
   * Update widget
   * @param widget
   */
  public async updateWidget(widget: TWidget): Promise<{ id: number } | null> {
    const { type } = widget;

    if (type === "youtube") {
      return await this.updateYoutubeWidget(widget as TYoutubeWidget);
    }

    if (type === "link") {
      return await this.updateLinkWidget(widget as TLinkWidget);
    }

    if (type === "image") {
      return await this.updateImageWidget(widget as TImageWidget);
    }

    throw new Error("Invalid widget type");
  }

  /**
   * Update link widget
   * @param widget
   * @private
   */
  private async updateLinkWidget(
    widget: TLinkWidget,
  ): Promise<{ id: number } | null> {
    return await linkWidgetUpdate(widget);
  }

  /**
   * Update image widget
   * @param widget
   * @private
   */
  private async updateImageWidget(
    widget: TImageWidget,
  ): Promise<{ id: number } | null> {
    return await imageWidgetUpdate(widget);
  }

  /**
   * Update youtube widget
   * @param widget
   * @private
   */
  private async updateYoutubeWidget(
    widget: TYoutubeWidget,
  ): Promise<{ id: number } | null> {
    return await youtubeWidgetUpdate(widget);
  }

  /**
   * Delete widget
   * @param id
   * @param type
   */
  public async deleteWidget(
    id: number,
    type: string,
  ): Promise<{ id: number } | null> {
    switch (type) {
      case "youtube":
        return await removeYoutubeWidgetById(id);
      case "link":
        return await removeLinkWidgetById(id);
      case "image":
        return await removeImageWidgetById(id);

      default:
        throw new Error("Invalid widget type");
    }
  }
}

export const widgetService = new WidgetService();
