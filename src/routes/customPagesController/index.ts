import type { FastifyInstance } from "fastify";
import customPageCreate from "./customePageCreate";
import customPageGet from "./customPageGet";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(customPageCreate);
  fastify.route(customPageGet);

  done();
}
