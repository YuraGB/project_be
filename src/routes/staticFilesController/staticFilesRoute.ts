import { type FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

export const staticFilesRoute = async (instance: FastifyInstance) => {
  instance.register(fastifyStatic, {
    root: path.resolve("./", "../project_fe/dist"),
  });
};
