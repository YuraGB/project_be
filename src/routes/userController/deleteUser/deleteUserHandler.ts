import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../../services/userService";
import { type TRequestGetUserById } from "./types";

export const deleteUserHandler = async (
  request: FastifyRequest<TRequestGetUserById>,
  _reply: FastifyReply,
) => {
  const { body } = request;
  const user = await userService.deleteUser(body.id);

  return { user };
};
