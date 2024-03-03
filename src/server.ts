import "dotenv/config";
import fastify, { type FastifyReply } from "fastify";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import { staticFilesPlugin } from "./plugins/staticFilesPlugin/staticFilesPlugin";
import routes from "./routes";

import jwtConfig from "./plugins/jwtPlugin/";
import cookiesConfig from "./plugins/cookiesPlugin/";

const build = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(staticFilesPlugin);
  app.register(cookie, cookiesConfig as FastifyCookieOptions);
  app.register(fastifyJwt, jwtConfig);

  // Routes
  app.register(routes);

  app.setNotFoundHandler((_req, reply: FastifyReply) => {
    reply.sendFile("index.html");
  });

  return app;
};

export { build };
