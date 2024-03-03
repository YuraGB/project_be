import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../../services/userService";
import { type User } from "../../../services/userService/types";

export const userCreateController = async (
  request: FastifyRequest,
  _reply: FastifyReply,
) => {
  const { body } = request;
  console.log("userCreateController", body);

  await userService.createUser(body as User);

  return { message: "User created" };
};
