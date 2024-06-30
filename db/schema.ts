import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
// https://neon.tech/docs/guides/drizzle-migrations



export const accounts = pgTable("accounts", {
  id: uuid('id').defaultRandom().primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// https://orm.drizzle.team/docs/zod
// generate Zod schemas from Drizzle ORM schemas (for post requests)
export const insertAccountSchema = createInsertSchema(accounts);
