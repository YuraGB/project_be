import { type TPageData } from "./types";
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
import { getWidgetsByPageId } from "../../model/widget/getWidgetsByPageId";

class CustomPageService {
  userService: IUserService;
  widgetService: IWidgetService;

  constructor(userService: IUserService, widgetService: IWidgetService) {
    this.userService = userService;
    this.widgetService = widgetService;
  }

  public async getCustomPageData(
    pageId: number,
  ): Promise<TPageResponse | null> {
    const page = await getPageById(pageId);

    if (page === null) {
      throw new Error("Page not found");
    }

    const widgets = await getWidgetsByPageId(pageId);

    return {
      id: page.id.toString(),
      title: page.title,
      widgets: widgets ?? [],
    };
  }

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
}

export default new CustomPageService(userService, widgetService);
