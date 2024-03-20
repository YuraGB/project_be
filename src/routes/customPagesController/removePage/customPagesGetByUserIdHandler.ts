import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestPagesRemove } from "./types";
import customPageService from "../../../services/customPageService";

const removeCustomPage = async (
  request: FastifyRequest<TRequestPagesRemove>,
  reply: FastifyReply,
) => {
  const { params } = request;

  if (params.id === undefined) {
    return await reply.code(400).send("Page id is required");
  }

  const pages = await customPageService.removePage(Number(params.id));

  return await reply.send(pages);
};

export default removeCustomPage;
