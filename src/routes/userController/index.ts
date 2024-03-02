import type { FastifyInstance } from "fastify";
import { userCreateController } from "./createUser/userCreate";

export const userController = (
  instance: FastifyInstance,
  _: unknown,
  done: () => void,
): void => {
  instance.register(userCreateController, { prefix: "user" });

  done();
};
