import {
	pgTable,
	serial,
	timestamp,
	varchar,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

export const authProviderEnum = pgEnum("auth_provider", ["GOOGLE", "TELEGRAM"]);

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	authProvider: authProviderEnum("auth_provider").notNull(),
	email: varchar("email", { length: 64 }).unique(),
	telegramId: varchar("telegram_id", { length: 64 }).unique(),
	balance: integer("balance").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
