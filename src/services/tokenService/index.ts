import "dotenv/config";
import { type FastifyReply } from "fastify";
import { type User } from "../userService/types";
import { type ITokenService } from "./types";
import { saveRefreshToken } from "../../model/token/seveRefreshToken";
import { removeToken } from "../../model/token/removeToken";

class TokenService implements ITokenService {
  async generateAccessToken(reply: FastifyReply, payload: User): Promise<string> {
    return await reply.jwtSign(payload, {
      expiresIn: "1h",
    });
  }

  async generateRefreshToken(reply: FastifyReply, payload: User): Promise<string> {
    return await reply.jwtSign(payload, {
      expiresIn: "1w",
    });
  }

  async generateTokens(
    reply: FastifyReply,
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [refreshToken, accessToken] = await Promise.all([
      this.generateRefreshToken(reply, user),
      this.generateAccessToken(reply, user),
    ]);
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    if (refreshToken && userId) {
      return await saveRefreshToken(userId, refreshToken);
    } else {
      return null;
    }
  }

  async deleteToken(refreshToken: string) {
    if (refreshToken) {
      return await removeToken(refreshToken);
    }
    console.log("deleteToken", refreshToken);
    return false;
  }
}

export default new TokenService();
