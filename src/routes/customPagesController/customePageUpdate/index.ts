import { type HTTPMethods } from "fastify";
import customPagesUpdateController from "./customePagesUpdateController";

export default {
  method: "PUT" as HTTPMethods,
  url: "/page/update",
  schema: {
    body: {
      type: "object",
      required: ["page_title", "userId", "widgets"],
      properties: {
        id: { type: "number" },
        page_title: { type: "string" },
        userId: { type: "number" },
        widgets: { type: "array" },
      },
    },
  },
  handler: customPagesUpdateController,
};
