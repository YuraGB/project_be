import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const ExampleTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey().unique(),
    nickname: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    dateOfBirth: text("date_of_birth").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  },
);
