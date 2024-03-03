import { cookieRoute } from "./coockieRoute.js";
import { type HTTPMethods } from "fastify";

export default {
  method: "GET" as HTTPMethods,
  url: "/cookies",
  handler: cookieRoute,
};
