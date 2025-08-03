import { pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: serial().primaryKey(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});
