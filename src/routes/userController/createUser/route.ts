import { type HTTPMethods } from "fastify";
import { userCreateController } from "./userCreateHandler";
import schema from "./schemaUserCreate";

export default {
  method: "POST" as HTTPMethods,
  url: "/create",
  handler: userCreateController,
  schema,
};
