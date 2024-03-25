export interface TRequestCreatePage {
  Body: {
    page_title: string;
    userId: number;
    widgets: TSaveWidgets[];
  };
}

export interface TPageResponse {
  id: number;
  title: string;
  youtubeWidgets?: TYoutubeWidget[];
}

export interface TSaveWidgets {
  type: string;
  widgets: TWidget[];
}

export type Widget = {
  id: number;
  type: string;
} & TYoutubeType;

export type TWidget<T = object> = {
  id: number;
  type: string;
  pageId?: number | null;
} & T;

export interface TYoutubeType {
  youtube_title: string;
  youtube_id: string;
  title?: string;
}

export interface TPageId {
  pageId: number | null;
}

export type TYoutubeWidget = TYoutubeType &
  TPageId & { id: number; type: string };
