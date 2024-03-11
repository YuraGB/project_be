import { type FastifyReply, type FastifyRequest } from "fastify";

export const authentificate = function (
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    void request.jwtVerify();
  } catch (err) {
    console.log(err);
    reply.send(err);
  }
};
