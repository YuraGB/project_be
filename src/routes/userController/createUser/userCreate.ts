import type { FastifyInstance } from "fastify";
import userService from "../../../services/userService";
import { type User } from "../../../services/userService/types";

export const userCreateController = (instance: FastifyInstance) => {
  instance.post("/create", async (request) => {
    const { body } = request;

    await userService.createUser(body as User);
  });
};
