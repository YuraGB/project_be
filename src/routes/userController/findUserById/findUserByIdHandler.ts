import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../../services/userService";
import { type TRequestGetUserById } from "./types";

export const findUserByIdHandler = async (
  request: FastifyRequest<TRequestGetUserById>,
  _reply: FastifyReply,
) => {
  const { params } = request;
  const user = await userService.getUserById(Number(params.id));

  return { user };
};
