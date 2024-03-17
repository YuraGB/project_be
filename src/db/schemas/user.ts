import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { TokenTable } from "./token";
import { PagesTable } from "./page";

export const UsersTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    dateOfBirth: text("date_of_birth").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone").notNull(),
    agreement: boolean("agreement").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  },
);
export const userRelations = relations(UsersTable, ({ one, many }) => ({
  token: one(TokenTable, {
    fields: [UsersTable.id],
    references: [TokenTable.userId],
  }),
  pages: many(PagesTable),
}));
