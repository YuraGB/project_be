import type { FastifyInstance } from "fastify";
import customPageCreate from "./customePageCreate";
import customPageGet from "./customPageGet";
import customPagesGetByUserId from "./customPagesGetByUserId";
import removePage from "./removePage";
import updatePage from "./customePageUpdate";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(customPageCreate);
  fastify.route(customPageGet);
  fastify.route(customPagesGetByUserId);
  fastify.route(removePage);
  fastify.route(updatePage);

  done();
}
