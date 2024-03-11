import type { FastifyReply, FastifyRequest } from "fastify";
import authService from "../../../services/authService";
import { type TRequestCreateUser } from "../../userController/createUser/types";

const signUpController = async (
  request: FastifyRequest<TRequestCreateUser>,
  reply: FastifyReply,
) => {
  const { body } = request;

  return await authService.signUp(reply, body);
};

export default signUpController;
