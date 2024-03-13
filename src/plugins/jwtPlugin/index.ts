import "dotenv/config";
export default {
  secret: process.env.JWT_SECRET ?? "secret",
  cookie: {
    cookieName: "refreshToken",
    signed: true,
  },
  decode: { complete: true },
  jwtVerify: process.env.JWT_SECURITY_VERIFY ?? "securityVerify",
  sign: {
    expiresIn: "1h",
  },
};
