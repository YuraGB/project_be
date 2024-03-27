import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestRemoveWidget } from "./types";
import { widgetService } from "../../../services/widgetService";

export const removeWidgetHandler = async (
  request: FastifyRequest<TRequestRemoveWidget>,
  _reply: FastifyReply,
) => {
  const { body } = request;

  return await widgetService.deleteWidget(body);
};
