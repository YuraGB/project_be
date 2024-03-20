import { type HTTPMethods } from "fastify";
import removeCustomPage from "./customPagesGetByUserIdHandler";

export default {
  method: "DELETE" as HTTPMethods,
  url: "/page/:id",
  handler: removeCustomPage,
};
