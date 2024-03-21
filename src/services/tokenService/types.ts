import { type FastifyReply } from "fastify";
import { type User } from "../userService/types";
import { type TokenTable } from "../../db/schemas/token";
import { type InferSelectModel } from "drizzle-orm";

export type Token = InferSelectModel<typeof TokenTable>;

export interface ITokenService {
  generateAccessToken: (reply: FastifyReply, payload: User) => Promise<string>;
  generateRefreshToken: (reply: FastifyReply, payload: User) => Promise<string>;
  generateTokens: (
    reply: FastifyReply,
    user: User,
  ) => Promise<{ accessToken: string; refreshToken: string }>;
  saveRefreshToken: (
    userId: number,
    refreshToken: string,
  ) => Promise<Token | null>;
  deleteToken: (refreshToken: string) => Promise<boolean | null>;
  refreshToken: (
    token: { payload: User },
    reply: FastifyReply,
  ) => Promise<{ accessToken: string; refreshToken: string } | null>;
}
