import {
  type TPageResponse,
  type Widget,
} from "../../../routes/customPagesController/customePageCreate/types";
import { type TWidgetData } from "../types";

export const formattedPagesResponse = (
  pagesData: TPageResponse[] | null,
): Array<{
  id: number;
  title: string;
  widgets: TWidgetData;
}> => {
  if (!Array.isArray(pagesData)) {
    return [];
  }

  if (pagesData.length === 0) {
    return [];
  }
  return pagesData.map(
    ({
      id,
      title,
      youtubeWidgets = [],
      linkWidgets = [],
      imageWidgets = [],
    }) => {
      return {
        id,
        title,
        widgets: formattedWidgetsData([
          ...youtubeWidgets,
          ...linkWidgets,
          ...imageWidgets,
        ]),
      };
    },
  );
};

const formattedWidgetsData = (widgets: Widget[] | []) => {
  if (!Array.isArray(widgets)) {
    return [];
  }

  if (widgets.length === 0) {
    return [];
  }
  console.log(widgets, "widgets234");
  return widgets.map(({ id, type, ...rest }) => {
    return {
      id,
      type,
      widgetData: rest,
    };
  });
};
