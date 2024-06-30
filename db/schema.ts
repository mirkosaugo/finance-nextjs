import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// https://neon.tech/docs/guides/drizzle-migrations



export const accounts = pgTable("accounts", {
  id: serial('id').primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
