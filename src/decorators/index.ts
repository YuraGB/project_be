import { type FastifyInstance } from "fastify";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.decorate("authenticate", null);

  done();
}
