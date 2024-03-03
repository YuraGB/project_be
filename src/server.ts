import "dotenv/config";
import fastify, { type FastifyReply } from "fastify";
import cookie from "@fastify/cookie";
// import route from "./routes/coockies/route";
import fastifyJwt from "@fastify/jwt";
import { staticFilesPlugin } from "./plugins/staticFilesPlugin/staticFilesPlugin";
import routes from "./routes";
import jwtConfig from "./plugins/jwtPlugin/";

const build = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(staticFilesPlugin);
  app.register(cookie);
  app.register(fastifyJwt, jwtConfig);

  // Routes
  app.register(routes);

  app.setNotFoundHandler((_req, reply: FastifyReply) => {
    reply.sendFile("index.html");
  });

  return app;
};

export { build };
