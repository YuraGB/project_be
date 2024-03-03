import "dotenv/config";

export default {
  secret: process.env.COOKIE_SECRET ?? "secret",
  hook: "onRequest",
};
