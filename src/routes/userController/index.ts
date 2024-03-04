import type { FastifyInstance } from "fastify";
import createUser from "./createUser/route";
import findUserById from "./findUserById/route";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(createUser);
  fastify.route(findUserById);

  done();
}
