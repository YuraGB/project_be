import { type FastifyInstance } from "fastify";
import cookieRoute from "./coockies/route";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(cookieRoute);

  done();
}
