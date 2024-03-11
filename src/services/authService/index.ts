import { type FastifyReply, type FastifyRequest } from "fastify";
import { type IUserService } from "../userService/types";
import { type ITokenService } from "../tokenService/types";
import {
  type AuthInterface,
  type SignUpErrorResponse,
  type SignUpSuccessResponse,
  type TLoginRequest,
} from "./types";
import userService from "../userService";
import tokenService from "../tokenService";
import { passwordCompare } from "../util/passwordHashing";
import { type ICreateUser } from "../../routes/userController/createUser/types";

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

    const passwordMatch = await passwordCompare(
      user.password,
      existingUser.password,
    );

    if (!passwordMatch) {
      return await response
        .code(401)
        .send({ isError: true, message: "Invalid password" });
    }

    let tokens;
    try {
      tokens = await this.tokenService.generateTokens(response, existingUser);
      await this.tokenService.saveRefreshToken(
        existingUser.id,
        tokens.refreshToken,
      );
    } catch (error) {
      console.error("login", error);
      return await response
        .code(500)
        .send({ isError: true, message: "Error: tokens not created" });
    }

    return await response
      .setCookie("refreshToken", tokens.refreshToken, {
        path: "/",
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send({
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
    userData: ICreateUser,
  ): Promise<SignUpSuccessResponse | SignUpErrorResponse> {
    const existingUser = await this.userService.getUserByEmail(userData.email);

    if (existingUser) {
      return await reply.code(400).send({ isError: true, message: "User exists" });
    }

    const createdUser = await this.userService.createUser(userData);

    if (!createdUser) {
      return await reply
        .code(500)
        .send({ isError: true, message: "User not created" });
    }
    try {
      const { accessToken, refreshToken } =
        await this.tokenService.generateTokens(reply, createdUser);

      // save refresh token to db
      await this.tokenService.saveRefreshToken(createdUser.id, refreshToken);

      return await reply
        .setCookie("refreshToken", refreshToken, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: true,
        })
        .code(200)
        .send({
          ...createdUser,
          accessToken,
        });
    } catch (error) {
      console.error("signUp", error);
      return await reply
        .code(500)
        .send({ isError: true, message: "Error: tokens not created" });
    }
  }
}

export default new AuthService(userService, tokenService);
