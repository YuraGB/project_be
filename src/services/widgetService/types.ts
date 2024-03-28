import {
  type TWidget,
  type Widget,
} from "../../routes/customPagesController/customePageCreate/types";

export interface IWidgetService {
  createWidget: (widgetData: TWidget) => Promise<Widget | null>;
  updateWidget: (widgetData: TWidget) => Promise<{ id: number } | null>;
  deleteWidget: (id: number, type: string) => Promise<{ id: number } | null>;
  getWidget: (id: number, type: string) => Promise<TWidget | null>;
}
