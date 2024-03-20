import { type HTTPMethods } from "fastify";
import customePagesCreateController from "./customePagesCreateController";

export default {
  method: "POST" as HTTPMethods,
  url: "/page/create",
  handler: customePagesCreateController,
};
