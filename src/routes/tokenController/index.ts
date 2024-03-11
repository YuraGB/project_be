import type { FastifyInstance } from "fastify";
import refreshToken from "./refreshToken";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(refreshToken);

  done();
}
