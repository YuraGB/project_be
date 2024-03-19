import { type HTTPMethods } from "fastify";
import customePageGetController from "./customePageGetController";

export default {
  method: "GET" as HTTPMethods,
  url: "/page/:id",
  handler: customePageGetController,
};
