import { type TRequestCreatePage } from "../../routes/customPagesController/customePageCreate/types";

export type TPageData = Pick<TRequestCreatePage, "Body">;

export interface TWidget<T = object> {
  id: number;
  type: string;
  widgetData?: T;
}

export interface TPage {
  id: number;
  title: string;
  widgets: TWidget[];
}
