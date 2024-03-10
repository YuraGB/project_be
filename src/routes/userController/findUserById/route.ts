import { type HTTPMethods } from "fastify";
import { findUserByIdHandler } from "./findUserByIdHandler";
import { authentificate } from "../../../decorators/util/authentificateHandler";

export default {
  method: "GET" as HTTPMethods,
  url: "/:id",
  onRequest: authentificate,
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
