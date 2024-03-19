import { type TWidget } from "../../routes/customPagesController/customePageCreate/types";

export interface IWidgetService {
  createWidget: (widgetData: TWidget) => Promise<TWidget | null>;
  updateWidget: (widgetData: TWidget) => Promise<undefined>;
  deleteWidget: (id: number) => Promise<undefined>;
  getWidget: (id: number, type: string) => Promise<TWidget | null>;
}
