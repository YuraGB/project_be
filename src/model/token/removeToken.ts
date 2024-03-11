import { db } from "../../db/db";
import { TokenTable } from "../../db/schemas/token";
import { eq } from "drizzle-orm";

export const removeToken = async (refreshToken: string) => {
  try {
    const token = await db
      .delete(TokenTable)
      .where(eq(TokenTable.refreshToken, refreshToken))
      .returning({ refreshToken: TokenTable.refreshToken });
    return !!token;
  } catch (error) {
    console.error("removeToken", error);
    return null;
  }
};
