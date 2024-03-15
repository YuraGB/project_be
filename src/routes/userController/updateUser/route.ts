import { type HTTPMethods } from "fastify";
import { updateUserHandler } from "./updateUserHandler";
import { authentificate } from "../../../decorators/util/authentificateHandler";

export default {
  method: "PUT" as HTTPMethods,
  url: "/update",
  onRequest: authentificate,
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        dateOfBirth: { type: "string" },
        phoneNumber: { type: "string" },
      },
      required: ["id", "email", "name", "dateOfBirth", "phoneNumber"],
    },
  },
  handler: updateUserHandler,
};
