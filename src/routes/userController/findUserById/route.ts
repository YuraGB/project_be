import { type HTTPMethods } from "fastify";
import { findUserByIdHandler } from "./findUserByIdHandler";

export default {
  method: "GET" as HTTPMethods,
  url: "/:id",
  schema: {
    params: {
      properties: {
        id: {
          type: "string",
        },
      },
    },
  },
  handler: findUserByIdHandler,
};
