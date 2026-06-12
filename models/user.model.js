import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  age: uuid().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
