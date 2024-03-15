import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../../services/userService";
import { type TRequestGetUserById } from "./types";

export const updateUserHandler = async (
  request: FastifyRequest<TRequestGetUserById>,
  _reply: FastifyReply,
) => {
  const { body } = request;
  const user = await userService.updateUser(body);

  return { user };
};
