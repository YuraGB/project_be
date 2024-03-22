import {
  type TWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";

export interface IWidgetService {
  createWidget: (widgetData: TWidget) => Promise<Widget | null>;
  updateWidget: (widgetData: TWidget) => Promise<undefined>;
  deleteWidget: (id: number) => Promise<undefined>;
  getWidget: (id: number, type: string) => Promise<TWidget | null>;
}
