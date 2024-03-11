import "dotenv/config";
export default {
  secret: process.env.JWT_SECRET ?? "secret",
  cookie: {
    cookieName: "refreshToken",
    signed: true,
  },
  decode: { complete: true },
  jwtVerify: "securityVerify",
  sign: {
    expiresIn: "1h",
  },
};
