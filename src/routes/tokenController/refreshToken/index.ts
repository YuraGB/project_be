import { type HTTPMethods } from "fastify";
import refreshTokenController from "./refreshTokenController";

export default {
  method: "GET" as HTTPMethods,
  url: "/refreshToken",
  handler: refreshTokenController,
};
