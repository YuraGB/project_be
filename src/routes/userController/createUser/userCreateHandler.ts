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
    console.log(err);
    existingUser = null;
  }

  if (existingUser) {
    reply.code(400).send({ isError: true, message: "User already exists" });
    return;
  }

  const createdUser = await userService.createUser(body);

  if (createdUser !== null) {
    const token = await reply.jwtSign(createdUser);

    return await reply
      .setCookie("refreshToken", token, {
        path: "/",
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send(createdUser);
  }

  return { isError: true, message: "User not created" };
};
