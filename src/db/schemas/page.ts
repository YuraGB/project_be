import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { UsersTable } from "./user";
import { relations } from "drizzle-orm";

export const PagesTable = pgTable("page", {
  id: serial("id").primaryKey().unique(),
  title: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("userId").references(() => UsersTable.id),
});

export const pageRelations = relations(PagesTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [PagesTable.userId],
    references: [UsersTable.id],
  }),
}));
