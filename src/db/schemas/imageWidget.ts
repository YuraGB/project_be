import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { PagesTable } from "./page";
import { type InferSelectModel, relations } from "drizzle-orm";

export const ImageWidget = pgTable("image_widget", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default(""),
  type: text("image_widget").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  image_link: text("image_link").notNull(),
  group: text("group").notNull().default(""),
  image_title: text("image_title").notNull(),
  image_src: text("image_src").notNull(),
  pageId: integer("page_id").references(() => PagesTable.id),
});

export const ImageWidgetRelations = relations(ImageWidget, ({ one }) => ({
  page: one(PagesTable, {
    fields: [ImageWidget.pageId],
    references: [PagesTable.id],
  }),
}));

export type TImageWidgetSchema = InferSelectModel<typeof ImageWidget>;
