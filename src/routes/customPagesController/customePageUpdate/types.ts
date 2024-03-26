import { type TSaveWidgets } from "../customePageCreate/types";

export interface TRequestUpdatePage {
  Body: {
    id: number;
    page_title: string;
    userId: number;
    widgets: TSaveWidgets[];
  };
}
