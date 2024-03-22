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
} from "../../routes/customPagesController/customePageCreate/types";
import { getPageById } from "../../model/page/getPageById";
import { getPagesByUserId } from "../../model/page/getPagesByUserId";
import {
  removePage,
  type TRemovePageResponse,
} from "../../model/page/removePage";
import { removeWidget } from "../../model/widget/removeWidget";
import { formattedPagesResponse } from "./util/formatgetPagesResponse";

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
   * @param pageId
   */
  public async getCustomPageData(
    _pageId: number,
  ): Promise<TPageResponse | null> {
    // const page = await getPageById(pageId);
    //
    // if (page === null) {
    //   throw new Error("Page not found");
    // }
    //
    // const widgets = await getWidgetsByPageId(pageId);
    //
    // return {
    //   id: page.id,
    //   title: page.title,
    //   widgets: widgets ?? [],
    // };

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

    const formattedWidgets = formatWidgetsData(data, createdPage.pageId);

    for (let i = 0; i < formattedWidgets.length; i++) {
      const widgetType = formattedWidgets[0].widgets;
      await Promise.allSettled(
        widgetType.map(async (w: TWidget) => await this.widgetService.createWidget(w)),
      );
    }

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
    console.log(pageData, "pageData");
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
}

export default new CustomPageService(userService, widgetService);
