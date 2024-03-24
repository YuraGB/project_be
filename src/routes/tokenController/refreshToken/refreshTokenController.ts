import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestLogin } from "./types";
import tokenService from "../../../services/tokenService";
import { type User } from "../../../services/userService/types";

const refreshTokenController = async (
  request: FastifyRequest<TRequestLogin>,
  reply: FastifyReply,
) => {
  const decodedToken = await request.jwtVerify({
    decode: {
      complete: true,
    },
    verify: {
      complete: true,
    },
  });

  if (!decodedToken) {
    return null;
  }
  console.log("decodedToken", decodedToken);
  if (typeof decodedToken !== "string" && "payload" in decodedToken) {
    const resp = await tokenService.refreshToken(
      decodedToken as { payload: User },
      reply,
    );

    reply.send(resp);
  }

  return null;
};

export default refreshTokenController;
