import { type HTTPMethods } from "fastify";
import logoutController from "./logoutController";

export default {
  method: "POST" as HTTPMethods,
  url: "/logout",
  handler: logoutController,
};
