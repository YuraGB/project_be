import { type HTTPMethods } from "fastify";
import { userCreateController } from "./userCreateHandler";

export default {
  method: "POST" as HTTPMethods,
  url: "/create",
  handler: userCreateController,
};
