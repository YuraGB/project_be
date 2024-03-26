import type { FastifyReply, FastifyRequest } from "fastify";
import { type TRequestCreatePage } from "./types";
import customPageService from "../../../services/customPageService";

const customePagesCreateController = async (
  request: FastifyRequest<TRequestCreatePage>,
  _reply: FastifyReply,
) => {
  const { body } = request;
  return await customPageService.createCustomPage(body);
};

export default customePagesCreateController;
