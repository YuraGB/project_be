import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestLogin } from "./types";
import authService from "../../../services/authService";

const loginController = async (
  request: FastifyRequest<TRequestLogin>,
  reply: FastifyReply,
) => {
  const { body } = request;
  console.log("body", body);
  return await authService.login(reply, body);
};

export default loginController;
