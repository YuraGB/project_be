import { type FastifyReply, type FastifyRequest } from "fastify";

export const cookieRoute = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = await reply.jwtSign({
    name: "foo",
  });

  const refreshToken = await reply.jwtSign(
    {
      name: "bar",
    },
    { expiresIn: "1d" },
  );

  reply
    .setCookie("refreshToken", refreshToken, {
      domain: "your.domain",
      path: "/",
      secure: true, // send cookie over HTTPS only
      httpOnly: true,
      sameSite: true, // alternative CSRF protection
    })
    .code(200)
    .send({ token });
};
