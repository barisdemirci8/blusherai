import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TUser = typeof users.$inferSelect;
