import type { FastifyInstance } from "fastify";
import loginRoute from "./login";
import logoutRoute from "./logout";
import signUpRoute from "./signUp";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(loginRoute);
  fastify.route(logoutRoute);
  fastify.route(signUpRoute);

  done();
}
