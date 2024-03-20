import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestPagesGet } from "./types";
import customPageService from "../../../services/customPageService";

const customPagesGetByUserIdHandler = async (
  request: FastifyRequest<TRequestPagesGet>,
  reply: FastifyReply,
) => {
  const { query } = request;
  if (query.userId === undefined) {
    return await reply.code(400).send("userId is required");
  }
  const pages = await customPageService.getCustomPagesDataByUserId(
    Number(query.userId),
  );

  return await reply.send(pages);
};

export default customPagesGetByUserIdHandler;
