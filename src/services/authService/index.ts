import { type FastifyReply, type FastifyRequest } from "fastify";
import { type IUserService, type User } from "../userService/types";
import { type ITokenService } from "../tokenService/types";
import {
  type AuthInterface,
  type SignUpErrorResponse,
  type SignUpSuccessResponse,
  type TLoginRequest,
} from "./types";
import userService from "../userService";
import tokenService from "../tokenService";

class AuthService implements AuthInterface {
  userService: IUserService;
  tokenService: ITokenService;

  constructor(userService: IUserService, tokenService: ITokenService) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  public async login(
    response: FastifyReply,
    user: TLoginRequest,
  ): Promise<FastifyReply> {
    const existingUser = await this.userService.getUserByEmail(user.email);

    if (!existingUser) {
      return await response
        .code(401)
        .send({ isError: true, message: "User not found" });
    }

    // todo add password hashing
    if (existingUser.password !== user.password) {
      return await response
        .code(401)
        .send({ isError: true, message: "Invalid password" });
    }

    const tokens = await this.tokenService.generateTokens(
      response,
      existingUser,
    );

    return await response.code(401).send({
      ...existingUser,
      ...tokens,
    });
  }

  public async logout(request: FastifyRequest, response: FastifyReply) {
    const { refreshToken } = request.cookies;
    if (refreshToken) {
      const isDeleted = await this.tokenService.deleteToken(refreshToken);

      if (isDeleted) {
        return await response
          .clearCookie("refreshToken")
          .code(200)
          .send({ message: "Logged out" });
      }

      return await response.code(500).send({ message: "Error" });
    }

    return await response.code(401).send({ message: "Unauthorized" });
  }

  public async signUp(
    reply: FastifyReply,
    userData: User,
  ): Promise<SignUpSuccessResponse | SignUpErrorResponse> {
    const existingUser = await this.userService.getUserByEmail(userData.email);

    if (existingUser) {
      return { isError: true, message: "User already exists" };
    }

    const createdUser = await this.userService.createUser(userData);

    if (!createdUser) {
      return { isError: true, message: "User not created" };
    }

    const tokens = await this.tokenService.generateTokens(reply, createdUser);

    return {
      createdUser,
      ...tokens,
    };
  }
}

export default new AuthService(userService, tokenService);
