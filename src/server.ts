import "dotenv/config";
import fastify, { type FastifyReply } from "fastify";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";

import { staticFilesRoute } from "./routes/staticFilesController/staticFilesRoute";
import routes from "./routes";

import jwtConfig from "./plugins/jwtPlugin/";
import cookiesConfig from "./plugins/cookiesPlugin/";
import corsConfig from "./plugins/corsPlugin/";

import decorators from "./decorators";

const build = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(cookie, cookiesConfig as FastifyCookieOptions);
  app.register(fastifyJwt, jwtConfig);
  app.register(cors, corsConfig);

  // Routes
  app.register(routes);
  app.register(staticFilesRoute);

  // Hooks
  // app.register(hooks);

  // Decorators
  app.register(decorators);

  app.setNotFoundHandler((_req, reply: FastifyReply) => {
    reply.sendFile("index.html");
  });

  return app;
};

export { build };
