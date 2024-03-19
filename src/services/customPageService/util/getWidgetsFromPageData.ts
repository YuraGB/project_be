import { type TPageData } from "../types";

export const formatWidgetsData = (
  pageData: TPageData["Body"],
  pageId: number,
) => {
  const { widgets } = pageData;
  for (let i = 0; i < widgets.length; i++) {
    const type = widgets[i].type;
    const widgetsType = widgets[i].widgets;

    widgetsType.map((widget) => {
      widget.type = type;
      widget.pageId = pageId;
      return widget;
    });
  }

  return widgets;
};
