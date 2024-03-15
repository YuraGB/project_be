import type { FastifyInstance } from "fastify";
import createUser from "./createUser/route";
import findUserById from "./findUserById/route";
import updateUser from "./updateUser/route";
import deleteUser from "./deleteUser/route";

export default function (
  fastify: FastifyInstance,
  _opts: unknown,
  done: () => void,
) {
  fastify.route(createUser);
  fastify.route(findUserById);
  fastify.route(updateUser);
  fastify.route(deleteUser);

  done();
}
