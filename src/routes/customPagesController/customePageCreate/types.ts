export interface TRequestCreatePage {
  Body: {
    page_title: string;
    userId: number;
    widgets: TSaveWidgets[];
  };
}

// Page data from database
export interface TPageResponse {
  id: number;
  title: string;
  youtubeWidgets?: TYoutubeWidget[];
  linkWidgets?: TLinkWidget[];
  imageWidgets?: TImageWidget[];
}

export interface TSaveWidgets {
  type: string;
  widgets: TWidget[];
}

export type Widget = {
  id?: number;
  type: string;
} & (TYoutubeType | TLinkType | TImageType);

export type TWidget<T = object> = {
  id: number;
  type: string;
  pageId?: number | null;
} & T;

export interface TYoutubeType {
  youtube_title: string;
  youtube_id: string;
  title?: string;
  group?: string;
}

export interface TLinkType {
  link_title: string;
  link_url: string;
  title?: string;
  group?: string;
}

export interface TImageType {
  image_title: string;
  image_link: string;
  image_src: string;
  title?: string;
  group?: string;
}

export interface TPageId {
  pageId: number | null;
}

export type TYoutubeWidget = TYoutubeType &
  TPageId & { id?: number; type: string };

export type TLinkWidget = TLinkType & TPageId & { id?: number; type: string };

export type TImageWidget = TImageType & TPageId & { id?: number; type: string };
