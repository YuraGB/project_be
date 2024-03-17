import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { UsersTable } from "./user";
import { relations } from "drizzle-orm";

export const TokenTable = pgTable("tokens", {
  id: serial("id").primaryKey(),
  refreshToken: text("refresh_token").notNull(),
  userId: integer("userId").references(() => UsersTable.id),
});

export const tokenRelations = relations(TokenTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [TokenTable.userId],
    references: [UsersTable.id],
  }),
}));
