import fastify, { type FastifyReply } from "fastify";
import cookie from "@fastify/cookie";
import { staticFilesPlugin } from "./plugins/staticFilesPlugin/staticFilesPlugin.js";
const build = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(cookie);
  app.register(staticFilesPlugin);

  // this will work with fastify-static and send __dirname, "../Project/dist" + "index.html" file
  app.setNotFoundHandler((_req, reply: FastifyReply) => {
    reply.sendFile("index.html");
  });

  return app;
};

export { build };
