import { type FastifyReply, type FastifyRequest } from "fastify";

export const authentificate = async function (
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({
      decode: {
        complete: true,
      },
      verify: {
        complete: true,
      },
    });
  } catch (err) {
    console.log(err, "err");
    reply.send(err);
  }
};
