import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestUpdatePage } from "./types";
import customPageService from "../../../services/customPageService";

const customPagesUpdateController = async (
  request: FastifyRequest<TRequestUpdatePage>,
  _reply: FastifyReply,
) => {
  const { body } = request;
  return await customPageService.updateCustomPage(body);
};

export default customPagesUpdateController;
