import { TokenTable } from "../../db/schemas/token";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";

export const findTokenByUserId = async (userId: string) => {
  try {
    const [token] = await db
      .select()
      .from(TokenTable)
      .where(eq(TokenTable.userId, Number(userId)));

    return { token };
  } catch (error) {
    console.error("findTokenByUserId", error);
    return null;
  }
};
