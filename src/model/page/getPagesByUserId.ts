import * as PagesSchema from "../../db/schemas/page";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import * as userSchema from "../../db/schemas/user";
import * as YoutubeSchema from "../../db/schemas/widget";
import postgres from "postgres";
import { type TPageSchema } from "../../db/schemas/page";

const queryClient = postgres(process?.env?.POSTGRES_URL ?? "");
const db = drizzle(queryClient, {
  schema: {
    ...userSchema,
    ...PagesSchema,
    ...YoutubeSchema,
  },
});

export const getPagesByUserId = async (
  id: number,
): Promise<TPageDataResponse | null> => {
  try {
    return await db.query.PagesTable.findMany({
      where: eq(PagesSchema.PagesTable.userId, id),
      with: {
        youtubeWidgets: true,
      },
    });
  } catch (error) {
    console.error("getPageById", error);
    return null;
  }
};

export type TPageDataResponse =
  | Array<TPageSchema & { youtubeWidgets: YoutubeSchema.TYoutubeWidgetSchema[] }>
  | null;
