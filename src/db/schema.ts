import {
  pgTable,
  text,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  //password: varchar("password").notNull(),
  provider: varchar("provider"),
  providerId: varchar("provider_id"),
  picture: varchar("picture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TUser = typeof usersTable.$inferSelect;
