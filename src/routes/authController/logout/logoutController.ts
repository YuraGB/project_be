import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestLogin } from "./types";
import authService from "../../../services/authService";

const logoutController = async (
  request: FastifyRequest<TRequestLogin>,
  reply: FastifyReply,
) => {
  return await authService.logout(request, reply);
};

export default logoutController;
