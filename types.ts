import { type JWT } from "@fastify/jwt";
declare module "fastify" {
  interface FastifyReply {
    jwt: JWT;
  }

  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
