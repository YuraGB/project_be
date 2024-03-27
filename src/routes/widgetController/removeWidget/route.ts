import { type HTTPMethods } from "fastify";
import { removeWidgetHandler } from "./removeWidgetHandler";
import { authentificate } from "../../../decorators/util/authentificateHandler";

export default {
  method: "DELETE" as HTTPMethods,
  url: "/widget/remove",
  onRequest: authentificate,
  handler: removeWidgetHandler,
};
