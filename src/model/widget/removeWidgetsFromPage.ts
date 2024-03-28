import { removeImageWidgetByPageId } from "./ImageWidget/removeImageWidgetByPageId";
import { removeLinkWidgetByPageId } from "./linkWidget/removeLinkWidgetBypageId";
import { removeYoutubeWidgetByPageId } from "./youtubeWidget/removeYoutubeWidgetByPageId";

export interface TRemoveWidgetsResponse {
  id: number;
}
export const removeWidgetsFromPage = async (
  id: number,
): Promise<Array<
  PromiseSettledResult<Awaited<Promise<TRemoveWidgetsResponse | null>>>
> | null> => {
  try {
    return await Promise.allSettled([
      removeLinkWidgetByPageId(id),
      removeYoutubeWidgetByPageId(id),
      removeImageWidgetByPageId(id),
    ]);
  } catch (e) {
    console.log(e);
    return null;
  }
};
