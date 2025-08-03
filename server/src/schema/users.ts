import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial().primaryKey(),
	email: varchar({ length: 256 }).unique().notNull(),
	name: varchar({ length: 128 }),
	avatarUrl: text(),
	authProvider: varchar({ length: 32 })
		.$type<"google" | "telegram">()
		.notNull(),
	telegramId: varchar({ length: 64 }),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});
