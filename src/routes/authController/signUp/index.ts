import { type HTTPMethods } from "fastify";
import signUpController from "./signUpController";
import schema from "../../userController/createUser/schemaUserCreate";

export default {
  method: "POST" as HTTPMethods,
  url: "/signUp",
  handler: signUpController,
  schema,
};
