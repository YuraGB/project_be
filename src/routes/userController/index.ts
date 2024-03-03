import type { FastifyInstance } from "fastify";
import createUser from "./createUser/route";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(createUser);

  done();
}
