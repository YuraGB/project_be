import { type FastifyReply, type FastifyRequest } from "fastify";

export const authentificate = function (
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    console.log("authentificate");
    void request.jwtVerify();
  } catch (err) {
    console.log(err, "err");
    reply.send(err);
  }
};
