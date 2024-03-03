import { type JWT } from "@fastify/jwt";
declare module "fastify" {
  interface FastifyReply {
    jwt: JWT;
  }
}
