import { type FastifyInstance } from "fastify";
import cookieRoute from "./coockies/route";
import userRoutes from "./userController/index";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(cookieRoute);

  fastify.register(userRoutes, {
    prefix: "/user",
  });

  done();
}
