import { type FastifyReply, type FastifyRequest } from "fastify";
import { type User } from "../userService/types";

export interface SignUpErrorResponse {
  isError: true;
  message: string;
}

export interface SignUpSuccessResponse {
  createdUser: User;
  accessToken: string;
  refreshToken: string;
}

export interface TLoginRequest {
  email: string;
  password: string;
}

export interface AuthInterface {
  signUp: (
    reply: FastifyReply,
    userData: User,
  ) => Promise<SignUpSuccessResponse | SignUpErrorResponse>;

  login: (response: FastifyReply, user: TLoginRequest) => Promise<FastifyReply>;
  logout: (
    request: FastifyRequest,
    response: FastifyReply,
  ) => Promise<FastifyReply>;
}
