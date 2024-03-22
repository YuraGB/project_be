import {
  type TPageResponse,
  type TYoutubeType,
  type Widget,
} from "../../../routes/customPagesController/customePageCreate/types";

export const formattedPagesResponse = (
  pagesData: TPageResponse[] | null,
): Array<{
  id: number;
  title: string;
  widgets: Array<{
    widgetData: Omit<
      { id: number; type: string } & TYoutubeType,
      "type" | "id"
    >;
    id: number;
    type: string;
  }>;
}> => {
  if (!Array.isArray(pagesData)) {
    return [];
  }

  if (pagesData.length === 0) {
    return [];
  }

  return pagesData.map(({ id, title, youtubeWidgets }) => {
    return {
      id,
      title,
      widgets: formattedWidgetsData(youtubeWidgets ?? []),
    };
  });
};

const formattedWidgetsData = (widgets: Widget[] | []) => {
  if (!Array.isArray(widgets)) {
    return [];
  }

  if (widgets.length === 0) {
    return [];
  }

  return widgets.map(({ id, type, ...rest }) => {
    return {
      id,
      type,
      widgetData: rest,
    };
  });
};
