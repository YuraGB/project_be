import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestPageGet } from "./types";
import customPageService from "../../../services/customPageService";

const customePageGetController = async (
  request: FastifyRequest<TRequestPageGet>,
  reply: FastifyReply,
) => {
  const { params } = request;

  const createPage = await customPageService.getCustomPageData(
    Number(params.id),
  );

  if (createPage === null) {
    reply.code(404).send({ message: "Page not found" });
  }

  return await reply.send(createPage);
};

export default customePageGetController;
