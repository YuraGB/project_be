import { type FastifyInstance } from "fastify";
import userRoutes from "./userController";
import authRoutes from "./authController";
import tokens from "./tokenController";
import customPageRoute from "./customPagesController";
import widgetRoute from "./widgetController";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.register(userRoutes, {
    prefix: "/api/v1/user",
  });

  fastify.register(authRoutes, {
    prefix: "/auth",
  });

  fastify.register(customPageRoute, {
    prefix: "/api/v1/",
  });

  fastify.register(widgetRoute, {
    prefix: "/api/v1/",
  });

  fastify.register(tokens);

  done();
}
