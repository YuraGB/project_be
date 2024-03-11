import { type FastifyInstance, type FastifyRequest } from "fastify";
import userRoutes from "./userController";
import authRoutes from "./authController";
import tokens from "./tokenController";
import { authentificate } from "../decorators/util/authentificateHandler";

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

  fastify.get(
    "/hello",
    { onRequest: authentificate },
    async (request: FastifyRequest, _reply) => {
      console.log(request.cookies);
      return "Hello World!";
    },
  );

  done();
}
