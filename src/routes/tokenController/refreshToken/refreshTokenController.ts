import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestLogin } from "./types";
import tokenService from "../../../services/tokenService";

const refreshTokenController = async (
  request: FastifyRequest<TRequestLogin>,
  reply: FastifyReply,
) => {
  return await tokenService.refreshToken(request, reply);
};

export default refreshTokenController;
