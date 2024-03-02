import fastify, { type FastifyReply } from "fastify";
import cookie from "@fastify/cookie";
import { staticFilesPlugin } from "./routes/staticFilesPlugin/staticFilesPlugin.js";
import { userController } from "./routes/userController";
const build = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(cookie);
  app.register(staticFilesPlugin);
  app.register(userController);

  // this will work with fastify-static and send __dirname, "../Project/dist" + "index.html" file
  app.setNotFoundHandler((_req, reply: FastifyReply) => {
    reply.sendFile("index.html");
  });

  return app;
};

export { build };
