import { db } from "../../db/db";
import { TokenTable } from "../../db/schemas/token";
import { type Token } from "../../services/tokenService/types";

export const saveRefreshToken = async (
  userId: number,
  refreshToken: string,
): Promise<Token | null> => {
  try {
    console.log("saveRefreshToken", userId, refreshToken);
    const [token] = await db
      .insert(TokenTable)
      .values({ userId, refreshToken })
      .returning();
    return token;
  } catch (error) {
    console.error("saveRefreshToken", error);
    return null;
  }
};
