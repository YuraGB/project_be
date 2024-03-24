import "dotenv/config";
import { type FastifyReply } from "fastify";
import { type User } from "../userService/types";
import { type ITokenService } from "./types";
import { saveRefreshToken } from "../../model/token/seveRefreshToken";
import { removeToken } from "../../model/token/removeToken";

class TokenService implements ITokenService {
  /**
   * Generate access token
   * @param reply
   * @param payload
   */
  async generateAccessToken(
    reply: FastifyReply,
    payload: User,
  ): Promise<string> {
    return await reply.jwtSign(
      {
        ...payload,
        name: "access-token",
      },
      {
        expiresIn: "1h",
      },
    );
  }

  /**
   * Generate refresh token
   * @param reply
   * @param payload
   */
  async generateRefreshToken(
    reply: FastifyReply,
    payload: User,
  ): Promise<string> {
    return await reply.jwtSign(payload, {
      expiresIn: "1w",
    });
  }

  async generateTokens(
    reply: FastifyReply,
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [refreshToken, accessToken] = await Promise.all([

      await this.generateAccessToken(reply, user),
      // refresh token should be in the end
      // because during "jwtVerify" well take the last generated token
      // by "reply.jwtSign"
      await this.generateRefreshToken(reply, user),

    ]);
    return { accessToken, refreshToken };
  }

  /**
   * Save refresh token
   * @param userId
   * @param refreshToken
   */
  public async saveRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<{
    id: number;
    refreshToken: string;
    userId: number | null;
  } | null> {
    if (refreshToken && userId) {
      return await saveRefreshToken(userId, refreshToken);
    } else {
      return null;
    }
  }

  /**
   * Delete refresh token
   * @param refreshToken
   */
  public async deleteToken(refreshToken: string): Promise<boolean | null> {
    if (refreshToken) {
      return await removeToken(refreshToken);
    }
    return false;
  }

  public async refreshToken(
    token: { payload: User },
    reply: FastifyReply,
  ): Promise<{ accessToken: string; refreshToken: string; user: User } | null> {
    if (!token) {
      return null;
    }

    // take only users fields
    const user = {
      id: token.payload.id,
      email: token.payload.email,
      password: token.payload.password,
      name: token.payload.name,
      dateOfBirth: token.payload.dateOfBirth,
      createdAt: token.payload.createdAt,
      phoneNumber: token.payload.phoneNumber,
      agreement: token.payload.agreement,
    } as User;

    const tokens = await this.generateTokens(reply, user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

export default new TokenService();
