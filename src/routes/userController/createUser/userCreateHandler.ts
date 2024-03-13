import type { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../../services/userService";
import { type TRequestCreateUser } from "./types";

export const userCreateController = async (
  request: FastifyRequest<TRequestCreateUser>,
  reply: FastifyReply,
) => {
  const { body } = request;
  let existingUser;
  try {
    existingUser = await userService.getUserByEmail(body.email);
  } catch (err) {
    reply.code(500).send({ isError: true, message: "Internal server error" });
    return;
  }

  if (existingUser) {
    reply.code(400).send({ isError: true, message: "User already exists" });
    return;
  }

  const createdUser = await userService.createUser(body);

  if (createdUser !== null) {
    reply.code(201).send({ isError: false, message: "User created" });
    return;
  }

  return await reply
    .code(500)
    .send({ isError: true, message: "Internal server error" });
};
