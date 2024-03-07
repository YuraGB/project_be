import { type FastifyInstance } from "fastify";

export default function (
  _fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  // fastify.addHook("onRequest", (request) =>
  //   request.jwtVerify({ onlyCookie: true }),
  // );
  done();
}
