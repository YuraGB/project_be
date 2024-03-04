import { type FastifyReply } from "fastify";
import { type User } from "../userService/types";

class AuthService {
  public async login(response: FastifyReply, user: User) {
    const token = await response.jwtSign(user);

    return await response
      .setCookie("token", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .code(200)
      .send(user);
  }

  public async logout(response: FastifyReply) {
    return await response
      .clearCookie("token", {
        path: "/",
      })
      .code(200)
      .send({ message: "Logged out" });
  }

  public async saveTokens(_userId: number, _refreshToken: string) {}
}

export default new AuthService();
