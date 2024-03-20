export interface TRequestCreatePage {
  Body: {
    page_title: string;
    userId: number;
    widgets: TSaveWidgets[];
  };
}

export interface TSaveWidgets {
  type: string;
  widgets: TWidget[];
}

export type TWidget<T = object, K = object, Z = ""> = {
  id: number;
  type: string | Z;
  pageId?: number | null;
} & T &
  K;

export interface TYoutubeType {
  youtube_title: string;
  youtube_id: string;
}

export interface TPageId {
  pageId: number | null;
}

export type TYoutubeWidget = TWidget<TYoutubeType, TPageId>;
