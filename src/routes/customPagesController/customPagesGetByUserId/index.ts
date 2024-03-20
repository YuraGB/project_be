import { type HTTPMethods } from "fastify";
import customPagesGetByUserIdHandler from "./customPagesGetByUserIdHandler";

export default {
  method: "GET" as HTTPMethods,
  url: "/pages",
  handler: customPagesGetByUserIdHandler,
};
