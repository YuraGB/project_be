import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { PagesTable } from "./page";
import { type InferSelectModel, relations } from "drizzle-orm";

export const YoutubeWidget = pgTable("youtube_widget", {
  id: serial("id").primaryKey(),
  type: text("youtube_widget").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  youtube_title: text("youtube_title").notNull(),
  youtube_id: text("youtube_id").notNull(),
  pageId: integer("page_id").references(() => PagesTable.id),
});

export const YoutubeWidgetRelations = relations(YoutubeWidget, ({ one }) => ({
  page: one(PagesTable, {
    fields: [YoutubeWidget.pageId],
    references: [PagesTable.id],
  }),
}));

export type TYoutubeWidgetSchema = InferSelectModel<typeof YoutubeWidget>;
