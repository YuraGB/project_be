import { type FastifyReply, type FastifyRequest } from "fastify";

export const authentificate = async function (
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    return await request.jwtVerify();
  } catch (err) {
    console.log(err);
    reply.send(err);
  }
};
