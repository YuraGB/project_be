import { type TPage, type TPageData } from "./types";
import { type IUserService } from "../userService/types";
import { pageCreate } from "../../model/page/pageCreate";
import userService from "../userService";
import { widgetService } from "../widgetService";
import { type IWidgetService } from "../widgetService/types";
import { formatWidgetsData } from "./util/getWidgetsFromPageData";
import {
  type TPageResponse,
  type TWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";
import { getPageById } from "../../model/page/getPageById";
import { getPagesByUserId } from "../../model/page/getPagesByUserId";
import {
  removePage,
  type TRemovePageResponse,
} from "../../model/page/removePage";
import { removeWidget } from "../../model/widget/removeWidget";
import { formattedPagesResponse } from "./util/formatgetPagesResponse";
import { type TRequestUpdatePage } from "../../routes/customPagesController/customePageUpdate/types";
import { updatePage } from "../../model/page/updatePage";
import { type TRequestCreatePage } from "../../routes/customPagesController/types";

class CustomPageService {
  /**
   * User service
   */
  userService: IUserService;

  /**
   * Widget service
   */
  widgetService: IWidgetService;

  /**
   * Constructor
   * @param userService
   * @param widgetService
   */
  constructor(userService: IUserService, widgetService: IWidgetService) {
    this.userService = userService;
    this.widgetService = widgetService;
  }

  /**
   * Get custom page data
   * @param _pageId
   */
  public async getCustomPageData(
    _pageId: number,
  ): Promise<TPageResponse | null> {
    return null;
  }

  /**
   * Create custom page
   * @param data
   */
  public async createCustomPage(
    data: TPageData["Body"],
  ): Promise<{ pageId: number | null } | null> {
    let user;
    let createdPage;

    try {
      user = await this.userService.getUserById(data.userId);
    } catch (error) {
      console.error("createCustomPage", error);
      user = null;
    }

    if (!user) {
      throw new Error("User not found");
    }

    try {
      createdPage = await pageCreate(data);
    } catch (error) {
      console.error("createCustomPage", error);
      createdPage = null;
    }

    if (!createdPage) {
      throw new Error("Page not created");
    }

    if (createdPage.pageId === null) {
      throw new Error("Page not created");
    }

    await this.actionsWithWidgets(
      data,
      createdPage.pageId,
      this.widgetService.createWidget.bind(this.widgetService),
    );

    return createdPage;
  }

  /**
   * Get custom pages data by user id
   * @param id
   */
  public async getCustomPagesDataByUserId(id: number): Promise<TPage[] | null> {
    const user = await this.userService.getUserById(id);

    if (user === null) {
      throw new Error("User not found");
    }

    const pageData = await getPagesByUserId(id);

    if (pageData === null) {
      return null;
    }

    return formattedPagesResponse(pageData);
  }

  /**
   * Remove page
   * @param id page id
   */
  public async removePage(id: number): Promise<TRemovePageResponse | null> {
    if (!id) return null;

    const getPage = await getPageById(id);

    if (!getPage) return null;

    /**
     * Remove all widgets from page
     * @param {number} id Page id
     */
    const removedWidgets = await removeWidget(id);

    if (!removedWidgets) return null;

    return await removePage(id);
  }

  /**
   * Update custom page
   * @param data
   */
  public async updateCustomPage(
    data: TRequestUpdatePage["Body"],
  ): Promise<{ id: number } | null> {
    const { id } = data;

    if (!id) return null;

    const { widgets } = data;
    if (widgets.length) {
      // remove widgets
      await removeWidget(id);

      await this.actionsWithWidgets(
        data,
        id,
        this.widgetService.updateWidget.bind(this.widgetService),
      );
    }
    return await updatePage(data);
  }

  /**
   * Actions with widgets -> format -> create/update
   * @param data
   * @param pageId
   * @param cb callback
   * @private
   */
  private async actionsWithWidgets(
    data: TRequestUpdatePage["Body"] | TRequestCreatePage["Body"],
    pageId: number,
    cb: (w: TWidget) => Promise<Widget | null | { id: number }>,
  ) {
    const formattedWidgets = formatWidgetsData(data, pageId);

    for (let i = 0; i < formattedWidgets.length; i++) {
      const widgetType = formattedWidgets[0].widgets;
      await Promise.allSettled(widgetType.map(cb));
    }
  }
}

export default new CustomPageService(userService, widgetService);
