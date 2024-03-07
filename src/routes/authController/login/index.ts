import { type HTTPMethods } from "fastify";
import loginController from "./loginController";

export default {
  method: "POST" as HTTPMethods,
  url: "/login",
  handler: loginController,
};
