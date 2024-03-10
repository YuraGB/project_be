import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import userRoutes from "./userController";
import authRoutes from "./authController";

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

  fastify.get("/hello", (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Hello");
  });

  done();
}
