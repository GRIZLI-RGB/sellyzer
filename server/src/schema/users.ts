import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 256 }).unique(),
	name: varchar("name", { length: 128 }),
	avatarUrl: text("avatar_url"),
	authProvider: varchar("auth_provider", { length: 32 })
		.$type<"google" | "telegram">()
		.notNull(),
	telegramId: varchar("telegram_id", { length: 64 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
