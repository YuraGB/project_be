import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const UsersTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    dateOfBirth: text("dateOfBirth").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    agreement: boolean("agreement").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  },
);
