import { type FastifyInstance } from "fastify";
import userRoutes from "./userController";
import authRoutes from "./authController";
import tokens from "./tokenController";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.register(userRoutes, {
    prefix: "/user",
  });

  fastify.register(authRoutes, {
    prefix: "/auth",
  });

  fastify.register(tokens);

  done();
}
