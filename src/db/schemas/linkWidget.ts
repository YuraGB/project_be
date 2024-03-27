import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { PagesTable } from "./page";
import { type InferSelectModel, relations } from "drizzle-orm";

export const LinkWidget = pgTable("link_widget", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default(""),
  type: text("link_widget").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  link_url: text("link_url").notNull(),
  link_title: text("link_title").notNull(),
  pageId: integer("page_id").references(() => PagesTable.id),
});

export const LinkWidgetRelations = relations(LinkWidget, ({ one }) => ({
  page: one(PagesTable, {
    fields: [LinkWidget.pageId],
    references: [PagesTable.id],
  }),
}));

export type TLinkWidgetSchema = InferSelectModel<typeof LinkWidget>;
