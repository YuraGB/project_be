import { type User } from "../../../services/userService/types";

export type TRequestUpdateUser = Omit<
  User,
  "password" | "createdAt" | "agreement"
>;

export interface TRequestGetUserById {
  Body: TRequestUpdateUser;
}
