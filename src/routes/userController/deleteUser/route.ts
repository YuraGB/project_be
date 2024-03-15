import { type HTTPMethods } from "fastify";
import { deleteUserHandler } from "./deleteUserHandler";
import { authentificate } from "../../../decorators/util/authentificateHandler";

export default {
  method: "delete" as HTTPMethods,
  url: "/delete",
  onRequest: authentificate,
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
  handler: deleteUserHandler,
};
