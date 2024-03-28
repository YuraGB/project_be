import {
  type TImageType,
  type TLinkType,
  type TRequestCreatePage,
  type TYoutubeType,
} from "../../routes/customPagesController/customePageCreate/types";

export type TPageData = Pick<TRequestCreatePage, "Body">;

export interface TWidget<T = object> {
  id: number;
  type: string;
  widgetData?: T;
}

export interface TPage {
  id: number;
  title: string;
  widgets: TWidgetData;
}

export type TWidgetData = Array<{
  widgetData: Omit<
    { id?: number; type: string } & (TYoutubeType | TLinkType | TImageType),
    "type" | "id"
  >;
  id: number | undefined;
  type: string;
}>;
