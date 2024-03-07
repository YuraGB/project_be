import type { FastifyInstance } from "fastify";
import loginRoute from "./login";
import logoutRoute from "./logout";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(loginRoute);
  fastify.route(logoutRoute);

  done();
}
