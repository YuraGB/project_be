import type { FastifyInstance } from "fastify";
import removeWidget from "./removeWidget/route";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(removeWidget);

  done();
}
