import {
	pgTable,
	serial,
	timestamp,
	varchar,
	integer,
	text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	authProvider: text("auth_provider")
		.$type<"GOOGLE" | "TELEGRAM">()
		.notNull(),
	email: varchar("email", { length: 64 }).unique(),
	telegramId: varchar("telegram_id", { length: 64 }).unique(),
	balance: integer("balance").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
