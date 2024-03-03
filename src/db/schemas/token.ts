import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { UsersTable } from "./user";

export const TokenTable = pgTable("tokens", {
  id: serial("id").primaryKey(),
  refreshToken: text("refresh_token").notNull(),
  userId: integer("userId").references(() => UsersTable.id),
});
